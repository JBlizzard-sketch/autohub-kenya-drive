import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, ArrowRight, MessageCircle, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useRecentlyViewed, RecentlyViewedProduct } from "@/hooks/useRecentlyViewed";
import { useState, useEffect } from "react";

export const RecentlyViewedProducts = () => {
  const { addToCart } = useCart();
  const { getRecentlyViewed } = useRecentlyViewed();
  const [products, setProducts] = useState<RecentlyViewedProduct[]>([]);

  useEffect(() => {
    setProducts(getRecentlyViewed());
  }, []);

  const handleAddToCart = (e: React.MouseEvent, product: RecentlyViewedProduct) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      product_id: product.product_id,
      part_name: product.part_name,
      brand_name: product.brand_name,
      price_value: product.price_value,
      image_url: product.image_url,
    });
  };

  const handleWhatsAppOrder = (e: React.MouseEvent, product: RecentlyViewedProduct) => {
    e.preventDefault();
    e.stopPropagation();
    const whatsappNumber = "254700000000";
    const message = `Hi! I'd like to order:\n\n${product.part_name}\nBrand: ${product.brand_name}\nPrice: KES ${product.price_value?.toLocaleString()}\n\nProduct Link: ${window.location.origin}/products/${product.product_id}`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Eye className="h-8 w-8 text-primary" />
            <div>
              <h2 className="mb-1">Recently Viewed</h2>
              <p className="text-muted-foreground">Continue browsing where you left off</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(0, 4).map((product) => (
            <Link to={`/products/${product.product_id}`} key={product.product_id}>
              <Card className="group gradient-card shadow-card hover:shadow-elevated transition-smooth border-border hover:border-primary/50 h-full">
                <div className="aspect-square overflow-hidden bg-secondary/50">
                  {product.image_url ? (
                    <img
                      src={product.image_url}
                      alt={product.part_name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                      No Image
                    </div>
                  )}
                </div>
                
                <CardContent className="p-4">
                  <h3 className="font-semibold text-sm mb-1 line-clamp-2">
                    {product.part_name}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-2">
                    {product.brand_name}
                  </p>
                  <span className="text-lg font-bold text-primary">
                    KES {product.price_value?.toLocaleString()}
                  </span>
                </CardContent>
                
                <CardFooter className="p-4 pt-0 flex gap-2">
                  <Button 
                    className="flex-1 hover-scale" 
                    size="sm"
                    onClick={(e) => handleAddToCart(e, product)}
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add
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
          ))}
        </div>
      </div>
    </section>
  );
};
