import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";

const carTips = [
  "Check your engine oil level every two weeks for optimal performance.",
  "Replace your air filter every 12,000-15,000 km to improve fuel efficiency.",
  "Rotate your tires every 8,000-10,000 km for even wear.",
  "Check tire pressure monthly - proper inflation saves fuel and extends tire life.",
  "Replace brake pads when you hear squealing sounds to prevent rotor damage.",
  "Flush your coolant system every 48,000 km to prevent overheating.",
  "Inspect your battery terminals for corrosion every 3 months.",
  "Change your transmission fluid every 50,000 km for smooth shifting.",
  "Replace wiper blades every 6-12 months for clear visibility during rain.",
  "Check your serpentine belt for cracks or wear every 40,000 km.",
];

export const CarTipsWidget = () => {
  const [currentTip, setCurrentTip] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % carTips.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-12 bg-primary/5">
      <div className="container mx-auto px-4">
        <Card className="gradient-card shadow-elevated border-primary/20 overflow-hidden">
          <CardContent className="p-8">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-full flex-shrink-0 animate-pulse">
                <Lightbulb className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2 text-primary">
                  Car Care Tip
                </h3>
                <p
                  key={currentTip}
                  className="text-muted-foreground animate-fade-in"
                >
                  {carTips[currentTip]}
                </p>
              </div>
            </div>
            
            {/* Progress dots */}
            <div className="flex gap-1 mt-4 justify-center">
              {carTips.map((_, index) => (
                <div
                  key={index}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    index === currentTip
                      ? "w-8 bg-primary"
                      : "w-1.5 bg-primary/20"
                  }`}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
