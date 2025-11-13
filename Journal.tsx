import { useState, useEffect } from "react";
import { ArrowLeft, Save } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";

const moods = [
  { emoji: "😊", label: "Feliz", value: "happy" },
  { emoji: "😌", label: "Calmo", value: "calm" },
  { emoji: "😐", label: "Neutro", value: "neutral" },
  { emoji: "😔", label: "Cansado", value: "tired" },
  { emoji: "😢", label: "Triste", value: "sad" },
];

const Journal = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [selectedMood, setSelectedMood] = useState<string>("");
  const [feelings, setFeelings] = useState("");
  const [gratitude, setGratitude] = useState("");
  const [isSaving, setIsSaving] = useState(false);

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

  const handleSave = async () => {
    if (!selectedMood || !feelings) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, selecione seu humor e escreva o que está sentindo.",
        variant: "destructive",
      });
      return;
    }

    if (!user) {
      toast({
        title: "Erro",
        description: "Você precisa estar logado para salvar.",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }

    setIsSaving(true);

    try {
      const { error } = await supabase.from("journal_entries").insert({
        user_id: user.id,
        mood: selectedMood,
        content: feelings,
        gratitude: gratitude || null,
      });

      if (error) throw error;

      toast({
        title: "Entrada salva! 💜",
        description: "Você se expressou. Isso já é um ato de coragem.",
      });

      // Reset form
      setSelectedMood("");
      setFeelings("");
      setGratitude("");
      
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (error) {
      console.error("Erro ao salvar:", error);
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível salvar sua entrada. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-calm">
      <div className="container max-w-3xl mx-auto px-4 py-8 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4 animate-fade-in">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/")}
            className="hover:bg-primary/10"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Diário Emocional</h1>
            <p className="text-muted-foreground">
              {new Date().toLocaleDateString("pt-BR", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>

        {/* Mood Selector */}
        <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20 shadow-soft animate-scale-in">
          <h2 className="text-xl font-semibold mb-4">Como você se sente hoje?</h2>
          <div className="grid grid-cols-5 gap-3">
            {moods.map((mood) => (
              <button
                key={mood.value}
                onClick={() => setSelectedMood(mood.value)}
                className={`flex flex-col items-center gap-2 p-4 rounded-2xl transition-all ${
                  selectedMood === mood.value
                    ? "bg-primary text-primary-foreground scale-105 shadow-soft"
                    : "bg-muted hover:bg-accent hover:scale-105"
                }`}
              >
                <span className="text-4xl">{mood.emoji}</span>
                <span className="text-xs font-medium">{mood.label}</span>
              </button>
            ))}
          </div>
        </Card>

        {/* Feelings Input */}
        <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20 shadow-soft">
          <label className="block mb-4">
            <h2 className="text-xl font-semibold mb-2">O que aconteceu hoje?</h2>
            <Textarea
              value={feelings}
              onChange={(e) => setFeelings(e.target.value)}
              placeholder="Escreva aqui seus pensamentos e sentimentos..."
              className="min-h-[200px] resize-none border-border/50 focus:border-primary bg-background/50"
            />
          </label>
        </Card>

        {/* Gratitude Input */}
        <Card className="p-6 bg-card/50 backdrop-blur-sm border-secondary/20 shadow-soft">
          <label className="block mb-4">
            <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
              O que você é grato hoje? <span className="text-2xl">🙏</span>
            </h2>
            <Textarea
              value={gratitude}
              onChange={(e) => setGratitude(e.target.value)}
              placeholder="Liste três coisas pelas quais você é grato..."
              className="min-h-[120px] resize-none border-border/50 focus:border-secondary bg-background/50"
            />
          </label>
        </Card>

        {/* Save Button */}
        <Button
          onClick={handleSave}
          size="lg"
          disabled={isSaving}
          className="w-full bg-primary hover:bg-primary/90 shadow-soft hover:shadow-gentle transition-all"
        >
          <Save className="mr-2 h-5 w-5" />
          {isSaving ? "Salvando..." : "Salvar Entrada"}
        </Button>
      </div>
    </div>
  );
};

export default Journal;
