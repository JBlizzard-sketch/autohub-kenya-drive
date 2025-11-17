import { Button } from "@/components/ui/button";
import { ArrowRight, Award, Users, Package } from "lucide-react";
import { Link } from "react-router-dom";

export const AboutUsSnippet = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-background via-secondary/20 to-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="mb-4">Why Choose AutoHub Kenya?</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We're Kenya's leading auto parts supplier, committed to providing genuine parts, 
              exceptional service, and expert guidance for all your automotive needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center animate-fade-in">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Package className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">10,000+ Parts</h3>
              <p className="text-muted-foreground">
                Extensive inventory for all vehicle makes and models
              </p>
            </div>
            
            <div className="text-center animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">100% Genuine</h3>
              <p className="text-muted-foreground">
                Only authentic parts from trusted manufacturers
              </p>
            </div>
            
            <div className="text-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Expert Team</h3>
              <p className="text-muted-foreground">
                Knowledgeable staff ready to help you find the right parts
              </p>
            </div>
          </div>
          
          <div className="text-center">
            <Button size="lg" className="hover-scale" asChild>
              <Link to="/about">
                Learn More About Us
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
