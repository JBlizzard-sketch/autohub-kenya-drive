import { Shield, Truck, Headphones, Award } from "lucide-react";

const badges = [
  {
    icon: Shield,
    title: "Genuine Parts",
    description: "100% authentic products"
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Same-day dispatch in Nairobi"
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Expert help anytime"
  },
  {
    icon: Award,
    title: "Warranty",
    description: "Quality guaranteed"
  },
];

export const TrustBadges = () => {
  return (
    <section className="py-12 bg-primary/5 border-y border-primary/10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {badges.map((badge) => {
            const Icon = badge.icon;
            return (
              <div key={badge.title} className="flex flex-col items-center text-center animate-fade-in">
                <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <Icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-bold text-sm mb-1">{badge.title}</h3>
                <p className="text-xs text-muted-foreground">{badge.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
