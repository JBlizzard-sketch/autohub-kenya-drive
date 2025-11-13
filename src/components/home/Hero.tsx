import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-automotive.jpg";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Auto Parts"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-autohub-grey-dark/95 via-autohub-grey/90 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 py-24 md:py-32">
        <div className="max-w-2xl">
          <h1 className="mb-6 leading-tight">
            Quality Auto Parts
            <br />
            <span className="text-primary">Delivered Fast</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-lg">
            Kenya's premier destination for genuine auto parts. Browse thousands of parts for all makes and models.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="shadow-glow" asChild>
              <Link to="/products">
                <Search className="mr-2 h-5 w-5" />
                Browse Parts
              </Link>
            </Button>
            
            <Button size="lg" variant="secondary" asChild>
              <Link to="/products">Shop by Brand</Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-3 gap-8">
            <div>
              <div className="text-3xl font-bold text-primary">10K+</div>
              <div className="text-sm text-muted-foreground">Products</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">50+</div>
              <div className="text-sm text-muted-foreground">Brands</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">24/7</div>
              <div className="text-sm text-muted-foreground">Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
