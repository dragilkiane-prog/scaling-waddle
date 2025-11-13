import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Crown, Sparkles, Star, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import meditationImage from "@/assets/checkout-meditation.jpg";
import journalImage from "@/assets/checkout-journal.jpg";
import wellnessImage from "@/assets/checkout-wellness.jpg";

const Pricing = () => {
  const { toast } = useToast();

  const handlePurchase = () => {
    toast({
      title: "Em breve!",
      description: "A integração com pagamentos será implementada em breve.",
    });
  };

  const benefits = [
    "Acesso ilimitado a todos os desafios de autocuidado",
    "Diário emocional sem limites de entradas",
    "Rastreamento completo de humor e estatísticas",
    "Frases inspiracionais exclusivas",
    "Temas personalizados e customizações",
    "Conteúdo de áudio premium para meditação",
    "Atualizações e novos recursos para sempre",
    "Sem anúncios ou distrações",
  ];

  const testimonials = [
    {
      name: "Maria Silva",
      image: journalImage,
      text: "Este app mudou minha vida! Finalmente consigo acompanhar meu humor e entender minhas emoções. Vale cada centavo!",
      rating: 5,
    },
    {
      name: "João Santos",
      image: meditationImage,
      text: "A melhor decisão que tomei este ano. Os desafios diários me ajudam a manter o foco no meu bem-estar.",
      rating: 5,
    },
    {
      name: "Ana Costa",
      image: wellnessImage,
      text: "Simples, bonito e eficaz. Uso todos os dias e sinto uma diferença real na minha saúde mental.",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-peaceful p-4 md:p-8 py-12 animate-fade-in">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-block p-3 bg-primary/10 rounded-full mb-4 animate-float">
            <Crown className="w-12 h-12 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Transforme Sua Jornada de Autocuidado
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Junte-se a milhares de pessoas que já transformaram sua saúde mental e bem-estar
          </p>
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-6 animate-scale-in">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index} 
              className="shadow-gentle border border-primary/10 hover:shadow-soft transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-primary/20"
                  />
                  <div>
                    <h3 className="font-semibold text-foreground">{testimonial.name}</h3>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-warning text-warning" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground italic">
                  "{testimonial.text}"
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Offer Card */}
        <Card className="shadow-soft border-2 border-primary/20 animate-scale-in max-w-3xl mx-auto">
          <CardHeader className="text-center pb-8">
            <div className="inline-block mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-secondary" />
            </div>
            <CardTitle className="text-3xl md:text-4xl font-bold">
              Acesso Vitalício
            </CardTitle>
            <CardDescription className="text-lg mt-2">
              Pagamento único, benefícios para sempre
            </CardDescription>
            <div className="mt-6">
              <div className="text-5xl md:text-6xl font-bold text-primary">
                R$ 50
              </div>
              <div className="text-sm text-muted-foreground mt-2">
                Pagamento único • Sem mensalidades
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <h3 className="font-semibold text-lg text-foreground mb-4 flex items-center gap-2">
                <Heart className="w-5 h-5 text-secondary" />
                Tudo que você precisa para cuidar de si:
              </h3>
              {benefits.map((benefit, index) => (
                <div 
                  key={index} 
                  className="flex items-start gap-3 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="rounded-full bg-secondary/20 p-1 mt-0.5">
                    <Check className="w-4 h-4 text-secondary" />
                  </div>
                  <span className="text-foreground flex-1">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="bg-accent/30 rounded-lg p-6 mt-6 space-y-2">
              <p className="text-sm text-center text-foreground font-medium">
                ✨ Mais de 5.000 usuários já transformaram suas vidas
              </p>
              <p className="text-sm text-center text-foreground">
                💝 Investimento único de R$ 50 para uma vida inteira de autocuidado e bem-estar
              </p>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-4 pt-6">
            <Button 
              onClick={handlePurchase}
              className="w-full h-14 text-lg font-semibold bg-primary hover:bg-primary/90 shadow-soft"
              size="lg"
            >
              Comprar Agora
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              Pagamento seguro através do Google Play • Satisfação garantida
            </p>
          </CardFooter>
        </Card>

        {/* Trust Indicators */}
        <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <div className="text-center p-4 bg-card/50 rounded-lg border border-border/50">
            <div className="text-2xl font-bold text-primary">5.000+</div>
            <div className="text-sm text-muted-foreground">Usuários Ativos</div>
          </div>
          <div className="text-center p-4 bg-card/50 rounded-lg border border-border/50">
            <div className="text-2xl font-bold text-primary">4.9⭐</div>
            <div className="text-sm text-muted-foreground">Avaliação Média</div>
          </div>
          <div className="text-center p-4 bg-card/50 rounded-lg border border-border/50">
            <div className="text-2xl font-bold text-primary">98%</div>
            <div className="text-sm text-muted-foreground">Satisfação</div>
          </div>
        </div>

        <div className="text-center">
          <Button 
            variant="ghost" 
            onClick={() => window.history.back()}
            className="text-muted-foreground hover:text-foreground"
          >
            Voltar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
