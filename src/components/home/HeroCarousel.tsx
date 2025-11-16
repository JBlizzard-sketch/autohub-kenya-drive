import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroWarehouse from "@/assets/hero-warehouse.jpg";
import heroParts from "@/assets/hero-parts.jpg";
import heroMechanic from "@/assets/hero-mechanic.jpg";

const slides = [
  {
    image: heroWarehouse,
    title: "Quality Auto Parts",
    subtitle: "Delivered Fast",
    description: "Kenya's premier destination for genuine auto parts. Browse thousands of parts for all makes and models.",
  },
  {
    image: heroParts,
    title: "Precision Engineering",
    subtitle: "Guaranteed Quality",
    description: "Premium brake systems, suspension parts, and engine components from trusted manufacturers.",
  },
  {
    image: heroMechanic,
    title: "Expert Support",
    subtitle: "24/7 Available",
    description: "Professional guidance and genuine parts to keep your vehicle running at peak performance.",
  },
];

export const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="relative overflow-hidden h-[600px] md:h-[700px]">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-autohub-grey-dark/95 via-autohub-grey-dark/80 to-transparent" />
          </div>

          {/* Content */}
          <div className="relative container mx-auto px-4 h-full flex items-center">
            <div className="max-w-2xl animate-fade-in">
              <h1 className="mb-6 leading-tight text-5xl md:text-6xl lg:text-7xl">
                {slide.title}
                <br />
                <span className="text-primary">{slide.subtitle}</span>
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 max-w-lg">
                {slide.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="shadow-glow hover-scale" asChild>
                  <Link to="/products">
                    <Search className="mr-2 h-5 w-5" />
                    Browse Parts
                  </Link>
                </Button>
                
                <Button size="lg" variant="secondary" className="hover-scale" asChild>
                  <Link to="/categories">Shop by Category</Link>
                </Button>
              </div>

              {/* Stats - only on first slide */}
              {index === 0 && (
                <div className="mt-12 grid grid-cols-3 gap-8 animate-fade-in">
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
              )}
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/20 hover:bg-background/40 backdrop-blur-sm text-foreground p-3 rounded-full transition-all hover-scale z-10"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/20 hover:bg-background/40 backdrop-blur-sm text-foreground p-3 rounded-full transition-all hover-scale z-10"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentSlide
                ? "w-8 bg-primary"
                : "w-2 bg-background/50 hover:bg-background/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};
