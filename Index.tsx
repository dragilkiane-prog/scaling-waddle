import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Smile, Meh, Frown } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { User, Session } from "@supabase/supabase-js";

const Index = () => {
  const [mood, setMood] = useState<string | null>(null);
  const [entry, setEntry] = useState("");
  const [gratitude, setGratitude] = useState("");
  const [saved, setSaved] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (!session?.user) {
          navigate("/");
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (!session?.user) {
        navigate("/");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSave = async () => {
    if (!entry || !mood || !user) return;

    try {
      const { error } = await supabase
        .from("journal_entries")
        .insert({
          user_id: user.id,
          mood,
          content: entry,
          gratitude: gratitude || null,
        });

      if (error) throw error;

      setSaved(true);
      toast({
        title: "Momento salvo! 🌿",
        description: "Você está cuidando bem de si 💜",
      });
      
      setTimeout(() => setSaved(false), 2500);
      setEntry("");
      setGratitude("");
      setMood(null);
    } catch (error) {
      toast({
        title: "Erro ao salvar",
        description: "Tente novamente em alguns instantes.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-calm px-4">
      <Card className="w-full max-w-md p-6 shadow-soft rounded-2xl bg-card/70 backdrop-blur-md border-primary/20 animate-scale-in">
        <CardContent className="space-y-6 text-center">
          <h1 className="text-3xl font-semibold text-primary">Serenamente 🌿</h1>
          <p className="text-muted-foreground text-sm">
            Um momento para você respirar, refletir e se cuidar 💜
          </p>

          {/* Humor do dia */}
          <div>
            <p className="font-medium mb-2 text-foreground">Como você está se sentindo hoje?</p>
            <div className="flex justify-center gap-6">
              <Smile
                className={`cursor-pointer transition-all ${
                  mood === "feliz" 
                    ? "text-secondary scale-125 drop-shadow-lg" 
                    : "text-muted-foreground hover:text-secondary/70 hover:scale-110"
                }`}
                size={36}
                onClick={() => setMood("feliz")}
              />
              <Meh
                className={`cursor-pointer transition-all ${
                  mood === "neutro" 
                    ? "text-accent scale-125 drop-shadow-lg" 
                    : "text-muted-foreground hover:text-accent/70 hover:scale-110"
                }`}
                size={36}
                onClick={() => setMood("neutro")}
              />
              <Frown
                className={`cursor-pointer transition-all ${
                  mood === "triste" 
                    ? "text-primary scale-125 drop-shadow-lg" 
                    : "text-muted-foreground hover:text-primary/70 hover:scale-110"
                }`}
                size={36}
                onClick={() => setMood("triste")}
              />
            </div>
          </div>

          {/* Diário emocional */}
          <div className="text-left space-y-4">
            <div>
              <p className="font-medium mb-2 text-foreground">Escreva algo sobre o seu dia 🌸</p>
              <Textarea
                placeholder="Como foi seu dia? O que você sentiu?"
                value={entry}
                onChange={(e) => setEntry(e.target.value)}
                className="resize-none border-border/50 focus:border-primary bg-background/50"
                rows={4}
              />
            </div>
            
            <div>
              <p className="font-medium mb-2 text-foreground">Pelo que você é grato hoje? (opcional) ✨</p>
              <Textarea
                placeholder="Uma pequena gratidão..."
                value={gratitude}
                onChange={(e) => setGratitude(e.target.value)}
                className="resize-none border-border/50 focus:border-primary bg-background/50"
                rows={2}
              />
            </div>
          </div>

          <Button
            onClick={handleSave}
            disabled={!mood || !entry}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-soft disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            Salvar momento
          </Button>

          {saved && (
            <p className="text-secondary font-medium mt-2 animate-fade-in">
              🌿 Momento salvo! Você está cuidando bem de si 💜
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
