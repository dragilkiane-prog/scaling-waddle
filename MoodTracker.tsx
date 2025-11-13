import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";

const moodEmojis: Record<string, string> = {
  happy: "😊",
  calm: "😌",
  neutral: "😐",
  tired: "😔",
  sad: "😢",
};

const moodLabels: Record<string, string> = {
  happy: "Feliz",
  calm: "Calmo",
  neutral: "Neutro",
  tired: "Cansado",
  sad: "Triste",
};

interface MoodEntry {
  day: string;
  mood: string;
  emoji: string;
  date: string;
}

const MoodTracker = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [moodData, setMoodData] = useState<MoodEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (!session) {
        navigate("/auth");
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (!session) {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (user) {
      fetchMoodData();
    }
  }, [user]);

  const fetchMoodData = async () => {
    if (!user) return;

    try {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      const { data, error } = await supabase
        .from("journal_entries")
        .select("mood, created_at")
        .eq("user_id", user.id)
        .gte("created_at", sevenDaysAgo.toISOString())
        .order("created_at", { ascending: true });

      if (error) throw error;

      // Group by day and get the most recent mood for each day
      const moodsByDay: Record<string, { mood: string; date: Date }> = {};
      
      data?.forEach((entry) => {
        const date = new Date(entry.created_at);
        const dayKey = date.toLocaleDateString("pt-BR", { weekday: "short" });
        
        if (!moodsByDay[dayKey] || new Date(entry.created_at) > moodsByDay[dayKey].date) {
          moodsByDay[dayKey] = { mood: entry.mood, date };
        }
      });

      // Create array for the last 7 days
      const last7Days: MoodEntry[] = [];
      for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dayKey = date.toLocaleDateString("pt-BR", { weekday: "short" });
        const dateStr = date.toLocaleDateString("pt-BR");
        
        if (moodsByDay[dayKey]) {
          last7Days.push({
            day: dayKey,
            mood: moodsByDay[dayKey].mood,
            emoji: moodEmojis[moodsByDay[dayKey].mood] || "😐",
            date: dateStr,
          });
        } else {
          last7Days.push({
            day: dayKey,
            mood: "neutral",
            emoji: "—",
            date: dateStr,
          });
        }
      }

      setMoodData(last7Days);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const moodStats = {
    happy: moodData.filter((d) => d.mood === "happy").length,
    calm: moodData.filter((d) => d.mood === "calm").length,
    neutral: moodData.filter((d) => d.mood === "neutral").length,
    tired: moodData.filter((d) => d.mood === "tired").length,
    sad: moodData.filter((d) => d.mood === "sad").length,
  };

  const totalMoods = moodData.filter((d) => d.emoji !== "—").length;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-calm flex items-center justify-center">
        <p className="text-muted-foreground">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-calm">
      <div className="container max-w-3xl mx-auto px-4 py-8 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4 animate-fade-in">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/dashboard")}
            className="hover:bg-primary/10"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Rastreador de Humor</h1>
            <p className="text-muted-foreground">Veja como você tem se sentido</p>
          </div>
        </div>

        {/* Weekly Overview */}
        <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20 shadow-soft">
          <h2 className="text-xl font-semibold mb-4">Últimos 7 dias</h2>
          {moodData.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              Comece a registrar seu humor para ver seu progresso aqui 📊
            </p>
          ) : (
            <div className="grid grid-cols-7 gap-2">
              {moodData.map((data, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center gap-2 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                  title={data.date}
                >
                  <span className="text-xs text-muted-foreground font-medium">
                    {data.day}
                  </span>
                  <span className="text-3xl">{data.emoji}</span>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Statistics */}
        <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20 shadow-soft">
          <h2 className="text-xl font-semibold mb-4">Estatísticas da Semana</h2>
          {totalMoods === 0 ? (
            <p className="text-center text-muted-foreground py-4">
              Nenhum registro ainda esta semana
            </p>
          ) : (
            <div className="space-y-4">
              {Object.entries(moodStats).map(([mood, count]) => {
                if (count === 0) return null;
                return (
                  <div key={mood} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="capitalize font-medium">
                        {moodLabels[mood]}
                      </span>
                      <span className="text-muted-foreground">
                        {count} {count === 1 ? "dia" : "dias"}
                      </span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all"
                        style={{
                          width: `${(count / totalMoods) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </Card>

        {/* Insight Card */}
        {totalMoods > 0 && (
          <Card className="p-6 bg-gradient-peaceful border-primary/20 shadow-soft">
            <div className="flex items-start gap-4">
              <span className="text-4xl">💡</span>
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">Reflexão da Semana</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {moodStats.happy > 0 ? (
                    <>
                      Você teve {moodStats.happy} {moodStats.happy === 1 ? "dia feliz" : "dias felizes"} esta semana! Continue
                      cultivando esses momentos de bem-estar.
                    </>
                  ) : moodStats.calm > 0 ? (
                    <>
                      Você teve {moodStats.calm} {moodStats.calm === 1 ? "dia calmo" : "dias calmos"} esta semana. A tranquilidade
                      também é uma forma valiosa de bem-estar.
                    </>
                  ) : (
                    <>
                      Toda jornada tem seus altos e baixos. O importante é continuar
                      cuidando de si mesmo, um dia de cada vez.
                    </>
                  )}{" "}
                  Lembre-se: cada pequeno passo conta na sua jornada de autocuidado. 🌸
                </p>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MoodTracker;
