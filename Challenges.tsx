import { useState } from "react";
import { ArrowLeft, Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const challenges = [
  {
    id: 1,
    title: "21 dias de amor-próprio",
    description: "Construa uma rotina de autocuidado",
    days: 21,
    current: 5,
    color: "bg-primary",
  },
  {
    id: 2,
    title: "7 dias de gratidão",
    description: "Encontre beleza nas pequenas coisas",
    days: 7,
    current: 3,
    color: "bg-secondary",
  },
  {
    id: 3,
    title: "14 dias de mindfulness",
    description: "Pratique a atenção plena",
    days: 14,
    current: 0,
    color: "bg-accent",
  },
];

const dailyTasks = [
  "Escreva 3 coisas boas sobre você",
  "Tome 10 minutos de sol",
  "Faça uma pausa para respirar profundamente",
  "Envie uma mensagem para alguém que ama",
  "Liste 5 coisas pelas quais é grato",
  "Pratique auto-compaixão por 5 minutos",
  "Desconecte das redes sociais por 1 hora",
];

const Challenges = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [completedToday, setCompletedToday] = useState(false);

  const handleCompleteDay = () => {
    setCompletedToday(true);
    toast({
      title: "Dia concluído! 🌸",
      description: "Você está fazendo um ótimo trabalho. Continue assim!",
    });
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
            <h1 className="text-3xl font-bold">Desafios de Autocuidado</h1>
            <p className="text-muted-foreground">Pequenos passos, grandes mudanças</p>
          </div>
        </div>

        {/* Active Challenges */}
        <div className="space-y-4 animate-scale-in">
          {challenges.map((challenge) => (
            <Card
              key={challenge.id}
              className="p-6 bg-card/50 backdrop-blur-sm border-primary/20 shadow-soft hover:shadow-gentle transition-all"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold">{challenge.title}</h3>
                    <p className="text-sm text-muted-foreground">{challenge.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">
                      {challenge.current}/{challenge.days}
                    </p>
                    <p className="text-xs text-muted-foreground">dias</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Progress value={(challenge.current / challenge.days) * 100} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    {Math.round((challenge.current / challenge.days) * 100)}% completo
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Today's Task */}
        <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20 shadow-soft">
          <h2 className="text-xl font-semibold mb-4">Tarefa de Hoje</h2>
          <div className="space-y-4">
            <div className="p-4 bg-gradient-peaceful rounded-2xl">
              <p className="text-lg font-medium text-center">
                {dailyTasks[new Date().getDay()]}
              </p>
            </div>

            {!completedToday ? (
              <Button
                onClick={handleCompleteDay}
                size="lg"
                className="w-full bg-primary hover:bg-primary/90 shadow-soft"
              >
                <Check className="mr-2 h-5 w-5" />
                Concluir Dia
              </Button>
            ) : (
              <div className="p-4 bg-secondary/20 rounded-2xl text-center">
                <div className="flex items-center justify-center gap-2 text-secondary font-semibold">
                  <Check className="h-5 w-5" />
                  <span>Dia concluído!</span>
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Motivation */}
        <Card className="p-6 bg-gradient-peaceful border-primary/20 shadow-soft">
          <div className="flex items-start gap-3">
            <span className="text-3xl">✨</span>
            <div>
              <h3 className="font-semibold mb-2">Continue assim!</h3>
              <p className="text-sm text-foreground/80">
                Cada pequeno passo conta. Você está construindo hábitos saudáveis que vão
                transformar sua vida.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Challenges;
