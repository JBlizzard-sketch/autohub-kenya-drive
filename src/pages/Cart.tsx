import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare, Trash2, Plus, Minus, Package } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { Separator } from "@/components/ui/separator";

const Cart = () => {
  const { items, removeFromCart, updateQuantity, total, clearCart } = useCart();

  const handleWhatsAppCheckout = () => {
    const phoneNumber = import.meta.env.VITE_WHATSAPP_NUMBER || "254700000000";
    
    const itemsList = items
      .map(
        (item) =>
          `${item.quantity}x ${item.part_name} - KES ${(
            item.price_value * item.quantity
          ).toLocaleString()}`
      )
      .join("\n");
    
    const message = `Hello! I'd like to order these parts:\n\n${itemsList}\n\nTotal: KES ${total.toLocaleString()}`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <h1>Shopping Cart ({items.length} items)</h1>
            {items.length > 0 && (
              <Button variant="outline" onClick={clearCart}>
                Clear Cart
              </Button>
            )}
          </div>
          
          {items.length === 0 ? (
            <Card className="gradient-card shadow-card">
              <CardContent className="p-12 text-center">
                <h3 className="mb-4">Your cart is empty</h3>
                <p className="text-muted-foreground mb-6">
                  Add some parts to get started
                </p>
                <Button asChild>
                  <Link to="/products">Browse Products</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                {items.map((item) => (
                  <Card key={item.product_id} className="gradient-card shadow-card">
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <Link to={`/products/${item.product_id}`}>
                          <div className="w-24 h-24 rounded-lg overflow-hidden bg-secondary/50 flex-shrink-0">
                            {item.image_url ? (
                              <img
                                src={item.image_url}
                                alt={item.part_name}
                                className="w-full h-full object-cover"
                                loading="lazy"
                                onError={(e) => {
                                  e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect width="200" height="200" fill="%23222"%3E%3C/rect%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="monospace" font-size="16" fill="%23888"%3ENo Image%3C/text%3E%3C/svg%3E';
                                  e.currentTarget.onerror = null;
                                }}
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
                                <Package className="h-8 w-8 opacity-30" />
                              </div>
                            )}
                          </div>
                        </Link>

                        <div className="flex-1 min-w-0">
                          <Link to={`/products/${item.product_id}`}>
                            <h3 className="font-semibold mb-1 hover:text-primary transition-colors">
                              {item.part_name}
                            </h3>
                          </Link>
                          <p className="text-sm text-muted-foreground mb-3">
                            {item.brand_name}
                          </p>

                          <div className="flex items-center justify-between flex-wrap gap-3">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() =>
                                  updateQuantity(item.product_id, item.quantity - 1)
                                }
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="w-12 text-center font-medium">
                                {item.quantity}
                              </span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() =>
                                  updateQuantity(item.product_id, item.quantity + 1)
                                }
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>

                            <div className="flex items-center gap-4">
                              <span className="text-lg font-bold text-primary">
                                KES {(item.price_value * item.quantity).toLocaleString()}
                              </span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-destructive hover:text-destructive"
                                onClick={() => removeFromCart(item.product_id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div>
                <Card className="gradient-card shadow-card sticky top-24">
                  <CardContent className="p-6">
                    <h3 className="mb-4">Order Summary</h3>
                    
                    <div className="space-y-2 mb-6">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span>KES {total.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Delivery</span>
                        <span>TBD</span>
                      </div>
                      <div className="border-t border-border pt-2 flex justify-between font-bold">
                        <span>Total</span>
                        <span className="text-primary">KES {total.toLocaleString()}</span>
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full shadow-glow" 
                      size="lg"
                      onClick={handleWhatsAppCheckout}
                    >
                      <MessageSquare className="mr-2 h-5 w-5" />
                      Checkout via WhatsApp
                    </Button>
                    
                    <p className="text-xs text-muted-foreground text-center mt-4">
                      Complete your order via WhatsApp for fast processing
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
