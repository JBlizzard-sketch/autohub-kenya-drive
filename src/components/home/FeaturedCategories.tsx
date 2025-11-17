import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Wrench, Disc, Gauge, Zap, Car, Cog } from "lucide-react";

const categories = [
  {
    name: "Engine Parts",
    icon: Cog,
    link: "/products?category=engine",
    description: "Pistons, filters, belts & more"
  },
  {
    name: "Brake Systems",
    icon: Disc,
    link: "/products?category=brakes",
    description: "Pads, discs, calipers"
  },
  {
    name: "Suspension",
    icon: Gauge,
    link: "/products?category=suspension",
    description: "Shocks, springs, bushings"
  },
  {
    name: "Electrical",
    icon: Zap,
    link: "/products?category=electrical",
    description: "Batteries, alternators, starters"
  },
  {
    name: "Body Parts",
    icon: Car,
    link: "/products?category=body",
    description: "Bumpers, mirrors, lights"
  },
  {
    name: "Tools & Accessories",
    icon: Wrench,
    link: "/products?category=tools",
    description: "Professional grade tools"
  },
];

export const FeaturedCategories = () => {
  return (
    <section className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="mb-2">Shop by Category</h2>
          <p className="text-muted-foreground">Find exactly what you need for your vehicle</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Link to={category.link} key={category.name}>
                <Card 
                  className="gradient-card shadow-card hover:shadow-elevated transition-all duration-300 group cursor-pointer border-border hover:border-primary/50 animate-fade-in h-full"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6 text-center">
                    <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                      <Icon className="h-6 w-6 text-primary group-hover:rotate-6 transition-transform" />
                    </div>
                    <h3 className="font-semibold text-sm mb-2 group-hover:text-primary transition-colors">{category.name}</h3>
                    <p className="text-xs text-muted-foreground">{category.description}</p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
