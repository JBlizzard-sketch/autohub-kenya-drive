import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, ArrowRight, MessageCircle, Package } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export const FeaturedProducts = () => {
  const { addToCart } = useCart();
  const [api, setApi] = useState<CarouselApi>();
  
  const { data: products, isLoading } = useQuery({
    queryKey: ["featured-products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products_final_v3")
        .select("*")
        .not("image_url", "is", null)
        .limit(12);
      
      if (error) throw error;
      return data;
    },
  });

  const handleAddToCart = (e: React.MouseEvent, product: any) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      product_id: product.product_id,
      part_name: product.part_name || "Auto Part",
      brand_name: product.brand_name || "Unknown",
      price_value: product.price_value || 0,
      image_url: product.image_url,
    });
  };

  const handleWhatsAppOrder = (e: React.MouseEvent, product: any) => {
    e.preventDefault();
    e.stopPropagation();
    const whatsappNumber = "254700000000";
    const message = `Hi! I'd like to order:\n\n${product.part_name || "Auto Part"}\nBrand: ${product.brand_name || "Unknown"}\nPrice: KES ${product.price_value?.toLocaleString() || "N/A"}\n\nProduct Link: ${window.location.origin}/products/${product.product_id}`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  if (isLoading) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-8">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <div className="aspect-square bg-muted" />
                <CardContent className="p-4">
                  <div className="h-4 bg-muted rounded mb-2" />
                  <div className="h-3 bg-muted rounded w-2/3" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="mb-2">Featured Auto Parts</h2>
            <p className="text-muted-foreground">High-quality parts for all vehicle makes and models</p>
          </div>
          <Button variant="outline" className="hover-scale" asChild>
            <Link to="/products">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        
        <Carousel
          setApi={setApi}
          plugins={[Autoplay({ delay: 3000, stopOnInteraction: true, stopOnMouseEnter: true })]}
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {products?.map((product) => (
              <CarouselItem key={product.product_id} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                <Link to={`/products/${product.product_id}`}>
                  <Card className="group gradient-card shadow-card hover:shadow-elevated transition-smooth border-border hover:border-primary/50 h-full overflow-hidden">
                    <div className="aspect-square overflow-hidden bg-secondary/50 relative">
                      {product.image_url ? (
                        <img
                          src={product.image_url}
                          alt={product.part_name || "Product"}
                          className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500"
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect width="400" height="400" fill="%23222"%3E%3C/rect%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="monospace" font-size="24" fill="%23888"%3ENo Image%3C/text%3E%3C/svg%3E';
                            e.currentTarget.onerror = null;
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                          <Package className="h-16 w-16 opacity-30" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-sm mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                        {product.part_name || "Auto Part"}
                      </h3>
                      <p className="text-xs text-muted-foreground mb-2">
                        {product.brand_name}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-primary">
                          KES {product.price_value?.toLocaleString() || "N/A"}
                        </span>
                      </div>
                    </CardContent>
                    
                    <CardFooter className="p-4 pt-0 flex gap-2">
                      <Button 
                        className="flex-1 hover-scale" 
                        size="sm"
                        onClick={(e) => handleAddToCart(e, product)}
                      >
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Add to Cart
                      </Button>
                      <Button 
                        variant="outline"
                        size="sm"
                        className="hover-scale"
                        onClick={(e) => handleWhatsAppOrder(e, product)}
                      >
                        <MessageCircle className="h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </div>
    </section>
  );
};
