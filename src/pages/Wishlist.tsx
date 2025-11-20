import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, X, Heart, MessageCircle, Package } from "lucide-react";
import { useWishlist } from "@/hooks/useWishlist";
import { useCart } from "@/contexts/CartContext";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const { items, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = (item: typeof items[0]) => {
    addToCart({
      product_id: item.product_id,
      part_name: item.part_name,
      brand_name: item.brand_name,
      price_value: item.price_value,
      image_url: item.image_url,
    });
  };

  const handleWhatsAppOrder = (item: typeof items[0]) => {
    const whatsappNumber = "254700000000";
    const message = `Hi! I'd like to order:\n\n${item.part_name}\nBrand: ${item.brand_name}\nPrice: KES ${item.price_value?.toLocaleString()}\n\nProduct Link: ${window.location.origin}/products/${item.product_id}`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-3 mb-8">
            <Heart className="h-8 w-8 text-primary" />
            <div>
              <h1 className="mb-1">My Wishlist</h1>
              <p className="text-muted-foreground">
                {items.length} {items.length === 1 ? 'item' : 'items'} saved
              </p>
            </div>
          </div>

          {items.length === 0 ? (
            <Card className="p-12 text-center">
              <Heart className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h2 className="text-2xl mb-2">Your wishlist is empty</h2>
              <p className="text-muted-foreground mb-6">
                Start adding items you love to your wishlist
              </p>
              <Button asChild>
                <Link to="/products">Browse Products</Link>
              </Button>
            </Card>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {items.map((item) => (
                <Card key={item.product_id} className="group gradient-card shadow-card hover:shadow-elevated transition-smooth border-border h-full relative">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 z-10 hover:bg-destructive/10"
                    onClick={() => removeFromWishlist(item.product_id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>

                  <Link to={`/products/${item.product_id}`}>
                    <div className="aspect-square overflow-hidden bg-secondary/50">
                      {item.image_url ? (
                        <img
                          src={item.image_url}
                          alt={item.part_name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
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
                    </div>

                    <CardContent className="p-4">
                      <h3 className="font-semibold text-sm mb-1 line-clamp-2">
                        {item.part_name}
                      </h3>
                      <p className="text-xs text-muted-foreground mb-2">
                        {item.brand_name}
                      </p>
                      <span className="text-lg font-bold text-primary">
                        KES {item.price_value?.toLocaleString()}
                      </span>
                    </CardContent>
                  </Link>

                  <CardFooter className="p-4 pt-0 flex gap-2">
                    <Button
                      className="flex-1 hover-scale"
                      size="sm"
                      onClick={() => handleAddToCart(item)}
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Add to Cart
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="hover-scale"
                      onClick={() => handleWhatsAppOrder(item)}
                    >
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Wishlist;
