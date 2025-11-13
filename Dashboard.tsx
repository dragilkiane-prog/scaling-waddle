import { useState } from "react";
import { Calendar, BookOpen, TrendingUp, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const moods = [
  { emoji: "😊", label: "Feliz", value: "happy" },
  { emoji: "😌", label: "Calmo", value: "calm" },
  { emoji: "😐", label: "Neutro", value: "neutral" },
  { emoji: "😔", label: "Cansado", value: "tired" },
  { emoji: "😢", label: "Triste", value: "sad" },
];

const dailyMessages = [
  "Hoje é um bom dia pra recomeçar 🌸",
  "Você está indo bem, um passo de cada vez 💜",
  "Seja gentil com você mesmo hoje 🌿",
  "Cada dia é uma nova oportunidade 🌅",
  "Você merece descanso e cuidado 💫",
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [streakDays] = useState(5);
  const dailyMessage = dailyMessages[new Date().getDay() % dailyMessages.length];

  return (
    <div className="min-h-screen bg-gradient-calm">
      <div className="container max-w-4xl mx-auto px-4 py-8 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2 animate-fade-in">
          <h1 className="text-4xl font-bold bg-gradient-peaceful bg-clip-text text-transparent">
            Bem-vindo de volta
          </h1>
          <p className="text-muted-foreground">Como você está se sentindo hoje?</p>
        </div>

        {/* Daily Message */}
        <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20 shadow-soft animate-scale-in">
          <div className="flex items-center gap-3">
            <Sparkles className="h-6 w-6 text-primary animate-float" />
            <p className="text-lg font-medium">{dailyMessage}</p>
          </div>
        </Card>

        {/* Mood Selector */}
        <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20 shadow-soft">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            Como você se sente agora?
          </h2>
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

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-4">
          <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20 shadow-gentle hover:shadow-soft transition-all">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-xl">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{streakDays} dias</p>
                <p className="text-sm text-muted-foreground">de autocuidado</p>
              </div>
            </div>
          </Card>

          <Button
            onClick={() => navigate("/journal")}
            variant="outline"
            className="h-auto p-6 border-secondary/50 hover:bg-secondary/10 hover:border-secondary transition-all"
          >
            <div className="flex items-center gap-4 w-full">
              <div className="p-3 bg-secondary/10 rounded-xl">
                <BookOpen className="h-6 w-6 text-secondary" />
              </div>
              <div className="text-left">
                <p className="font-semibold">Diário</p>
                <p className="text-sm text-muted-foreground">Escreva seus sentimentos</p>
              </div>
            </div>
          </Button>

          <Button
            onClick={() => navigate("/mood-tracker")}
            variant="outline"
            className="h-auto p-6 border-accent/50 hover:bg-accent/10 hover:border-accent transition-all"
          >
            <div className="flex items-center gap-4 w-full">
              <div className="p-3 bg-accent/20 rounded-xl">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <div className="text-left">
                <p className="font-semibold">Humor</p>
                <p className="text-sm text-muted-foreground">Veja seu progresso</p>
              </div>
            </div>
          </Button>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-4">
          <Button
            onClick={() => navigate("/challenges")}
            size="lg"
            className="h-auto py-6 bg-primary hover:bg-primary/90 shadow-soft hover:shadow-gentle transition-all"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">🌸</span>
              <div className="text-left">
                <p className="font-semibold">Desafios de Autocuidado</p>
                <p className="text-sm text-primary-foreground/80">21 dias de amor-próprio</p>
              </div>
            </div>
          </Button>

          <Button
            onClick={() => navigate("/quotes")}
            size="lg"
            variant="outline"
            className="h-auto py-6 border-primary/30 hover:bg-primary/5 transition-all"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">💜</span>
              <div className="text-left">
                <p className="font-semibold">Mensagens Inspiradoras</p>
                <p className="text-sm text-muted-foreground">Frases do dia</p>
              </div>
            </div>
          </Button>
        </div>

        {/* Premium Access */}
        <Card className="p-6 bg-gradient-peaceful border-primary/20 shadow-soft text-center">
          <h3 className="font-semibold text-lg mb-2">Acesso Premium 💎</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Desbloqueie desafios exclusivos, estatísticas detalhadas e muito mais
          </p>
          <Button
            onClick={() => navigate("/pricing")}
            className="bg-primary hover:bg-primary/90"
          >
            Ver Planos
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
