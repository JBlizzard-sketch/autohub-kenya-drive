import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  location: string;
  image: string;
  rating: number;
  testimonial: string;
}

export const TestimonialCard = ({ name, location, image, rating, testimonial }: TestimonialCardProps) => {
  return (
    <Card className="gradient-card shadow-card hover:shadow-elevated transition-smooth border-border h-full">
      <CardContent className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <img
            src={image}
            alt={name}
            className="w-16 h-16 rounded-full object-cover border-2 border-primary/20"
          />
          <div>
            <h4 className="font-semibold">{name}</h4>
            <p className="text-sm text-muted-foreground">{location}</p>
          </div>
        </div>
        
        <div className="flex gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < rating ? "fill-primary text-primary" : "text-muted-foreground"
              }`}
            />
          ))}
        </div>
        
        <p className="text-muted-foreground italic">"{testimonial}"</p>
      </CardContent>
    </Card>
  );
};
