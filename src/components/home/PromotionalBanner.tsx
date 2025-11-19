import { Button } from "@/components/ui/button";
import { Tag, TrendingUp, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export const PromotionalBanner = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-12 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border-y border-primary/20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Flash Sale */}
          <div className="gradient-card rounded-lg p-6 border border-primary/30 shadow-card hover:shadow-elevated transition-smooth">
            <div className="flex items-center gap-2 mb-3">
              <Tag className="h-5 w-5 text-primary animate-pulse" />
              <h3 className="font-bold text-lg">Flash Sale</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Up to 30% off on selected brake parts
            </p>
            <div className="flex items-center gap-2 mb-4">
              <Clock className="h-4 w-4 text-primary" />
              <span className="text-sm font-mono">
                {String(timeLeft.hours).padStart(2, '0')}:
                {String(timeLeft.minutes).padStart(2, '0')}:
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
            </div>
            <Button asChild className="w-full hover-scale">
              <Link to="/products?category=1">Shop Now</Link>
            </Button>
          </div>

          {/* Best Sellers */}
          <div className="gradient-card rounded-lg p-6 border border-border shadow-card hover:shadow-elevated transition-smooth">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="h-5 w-5 text-primary" />
              <h3 className="font-bold text-lg">Best Sellers</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Top-rated auto parts trusted by thousands
            </p>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                Most Popular
              </span>
            </div>
            <Button asChild variant="outline" className="w-full hover-scale">
              <Link to="/products">View All</Link>
            </Button>
          </div>

          {/* Free Delivery */}
          <div className="gradient-card rounded-lg p-6 border border-border shadow-card hover:shadow-elevated transition-smooth bg-gradient-to-br from-secondary/50 to-background">
            <div className="flex items-center gap-2 mb-3">
              <div className="h-5 w-5 text-primary">🚚</div>
              <h3 className="font-bold text-lg">Free Delivery</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Free delivery on orders over KES 10,000
            </p>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                Limited Time
              </span>
            </div>
            <Button asChild variant="outline" className="w-full hover-scale">
              <Link to="/products">Start Shopping</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
