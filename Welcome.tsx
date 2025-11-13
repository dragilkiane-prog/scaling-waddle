import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Sparkles, Heart, BookOpen } from "lucide-react";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-calm flex items-center justify-center px-4">
      <div className="max-w-2xl text-center space-y-8 animate-fade-in">
        <div className="space-y-4">
          <div className="flex justify-center gap-4 text-primary/40">
            <Sparkles className="w-8 h-8 animate-float" style={{ animationDelay: '0s' }} />
            <Heart className="w-8 h-8 animate-float" style={{ animationDelay: '0.5s' }} />
            <BookOpen className="w-8 h-8 animate-float" style={{ animationDelay: '1s' }} />
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-primary">
            Serenamente 🌿
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-xl mx-auto">
            Um espaço gentil para você se reconectar consigo mesmo
          </p>
        </div>

        <div className="space-y-4 max-w-md mx-auto">
          <p className="text-foreground/80">
            Aqui, você pode expressar seus sentimentos, acompanhar seu humor e cultivar
            pequenos hábitos de autocuidado — no seu ritmo, sem pressão.
          </p>
          
          <p className="text-sm text-muted-foreground">
            Respire fundo. Você está no lugar certo. 💜
          </p>
        </div>

        <div className="space-y-4 pt-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigate("/pricing")}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-soft"
            >
              Ver planos
            </Button>
            
            <Button
              onClick={() => navigate("/auth")}
              variant="outline"
              size="lg"
              className="border-primary/20 hover:bg-primary/5"
            >
              Já tenho uma conta
            </Button>
          </div>
          
          <Button
            onClick={() => navigate("/dashboard")}
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground"
          >
            Experimentar gratuitamente →
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
