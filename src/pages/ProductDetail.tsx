import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, ArrowLeft, Package, Truck, Shield } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products_final_v3")
        .select("*")
        .eq("product_id", Number(id))
        .single();

      if (error) throw error;
      return data;
    },
  });

  const { data: compatibility } = useQuery({
    queryKey: ["compatibility", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("compatibility")
        .select("*")
        .eq("product_id", Number(id));

      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        product_id: product.product_id,
        part_name: product.part_name || "Auto Part",
        brand_name: product.brand_name || "Unknown",
        price_value: product.price_value || 0,
        image_url: product.image_url,
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-1/3 mb-8" />
            <div className="grid md:grid-cols-2 gap-8">
              <div className="aspect-square bg-muted rounded" />
              <div className="space-y-4">
                <div className="h-10 bg-muted rounded" />
                <div className="h-6 bg-muted rounded w-2/3" />
                <div className="h-20 bg-muted rounded" />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <Card className="p-8 text-center">
            <h2 className="text-2xl mb-4">Product not found</h2>
            <Link to="/products">
              <Button>Browse Products</Button>
            </Link>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  const images = product.image_url ? [product.image_url] : [];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <Link to="/products">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Products
            </Button>
          </Link>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Image Carousel */}
            <div className="space-y-4">
              {images.length > 0 ? (
                <Carousel className="w-full">
                  <CarouselContent>
                    {images.map((img, index) => (
                      <CarouselItem key={index}>
                        <div className="aspect-square rounded-lg overflow-hidden bg-secondary/50">
                          <img
                            src={img}
                            alt={`${product.part_name} - ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  {images.length > 1 && (
                    <>
                      <CarouselPrevious />
                      <CarouselNext />
                    </>
                  )}
                </Carousel>
              ) : (
                <div className="aspect-square rounded-lg bg-secondary/50 flex items-center justify-center">
                  <Package className="h-24 w-24 text-muted-foreground" />
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">{product.part_name}</h1>
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="secondary">{product.brand_name}</Badge>
                  {product.part_number && (
                    <Badge variant="outline">SKU: {product.part_number}</Badge>
                  )}
                </div>
              </div>

              <div className="flex items-baseline gap-4">
                <span className="text-4xl font-bold text-primary">
                  KES {product.price_value?.toLocaleString()}
                </span>
              </div>

              <Separator />

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Package className="h-4 w-4 text-muted-foreground" />
                  <span>In Stock - Ready to Ship</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Truck className="h-4 w-4 text-muted-foreground" />
                  <span>Fast Delivery Available</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Shield className="h-4 w-4 text-muted-foreground" />
                  <span>Genuine Parts Guarantee</span>
                </div>
              </div>

              <Button
                size="lg"
                className="w-full shadow-glow"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>

              {product.description && (
                <Card className="gradient-card">
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2">Description</h3>
                    <p className="text-sm text-muted-foreground">
                      {product.description}
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Compatibility Section */}
          {compatibility && compatibility.length > 0 && (
            <Card className="gradient-card shadow-card">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">Vehicle Compatibility</h2>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {compatibility.map((item, index) => (
                    <div
                      key={index}
                      className="p-3 rounded-lg bg-secondary/50 border border-border"
                    >
                      <p className="font-semibold">{item.brand_name}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.model_variant}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
