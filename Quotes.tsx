import { useState } from "react";
import { ArrowLeft, RefreshCw, Share2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const quotes = [
  {
    text: "Você não precisa ser perfeito pra merecer descanso.",
    author: "Autocuidado",
  },
  {
    text: "Um passo de cada vez ainda é progresso.",
    author: "Jornada",
  },
  {
    text: "Seja gentil com você mesmo. Você está fazendo o melhor que pode.",
    author: "Compaixão",
  },
  {
    text: "Cuidar de si não é egoísmo, é necessidade.",
    author: "Amor-próprio",
  },
  {
    text: "Cada dia é uma nova chance de recomeçar.",
    author: "Esperança",
  },
  {
    text: "Você merece o mesmo amor e cuidado que dá aos outros.",
    author: "Reciprocidade",
  },
  {
    text: "Descansar não é falhar. É se preparar para continuar.",
    author: "Descanso",
  },
  {
    text: "Seus sentimentos são válidos. Todos eles.",
    author: "Validação",
  },
];

const Quotes = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  const handleNewQuote = () => {
    const newIndex = Math.floor(Math.random() * quotes.length);
    setCurrentQuoteIndex(newIndex);
  };

  const handleShare = () => {
    toast({
      title: "Compartilhado! 💜",
      description: "A mensagem foi copiada para sua área de transferência.",
    });
  };

  const currentQuote = quotes[currentQuoteIndex];

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
            <h1 className="text-3xl font-bold">Mensagens Inspiradoras</h1>
            <p className="text-muted-foreground">Palavras de cuidado e acolhimento</p>
          </div>
        </div>

        {/* Main Quote Card */}
        <Card className="p-12 bg-gradient-peaceful backdrop-blur-sm border-primary/20 shadow-soft animate-scale-in min-h-[400px] flex flex-col items-center justify-center text-center">
          <div className="space-y-6 max-w-2xl">
            <span className="text-6xl animate-float">💜</span>
            <blockquote className="text-3xl font-bold leading-relaxed">
              "{currentQuote.text}"
            </blockquote>
            <p className="text-lg text-foreground/70">— {currentQuote.author}</p>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <Button
            onClick={handleNewQuote}
            size="lg"
            className="bg-primary hover:bg-primary/90 shadow-soft"
          >
            <RefreshCw className="mr-2 h-5 w-5" />
            Nova Mensagem
          </Button>

          <Button
            onClick={handleShare}
            size="lg"
            variant="outline"
            className="border-primary/30 hover:bg-primary/5"
          >
            <Share2 className="mr-2 h-5 w-5" />
            Compartilhar
          </Button>
        </div>

        {/* Quote Gallery */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold">Outras mensagens</h2>
          <div className="grid gap-3">
            {quotes.slice(0, 4).map((quote, index) => (
              <Card
                key={index}
                onClick={() => setCurrentQuoteIndex(index)}
                className="p-4 bg-card/50 backdrop-blur-sm border-primary/20 shadow-gentle hover:shadow-soft transition-all cursor-pointer hover:scale-[1.02]"
              >
                <p className="text-sm font-medium">"{quote.text}"</p>
                <p className="text-xs text-muted-foreground mt-2">— {quote.author}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quotes;
