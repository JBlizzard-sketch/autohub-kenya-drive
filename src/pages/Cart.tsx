import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";

const Cart = () => {
  // Placeholder - will be replaced with real cart functionality
  const cartItems: any[] = [];
  const total = 0;

  const handleWhatsAppCheckout = () => {
    const phoneNumber = "254700000000"; // Replace with actual WhatsApp number
    const message = `Hello! I'd like to order these parts:\n\nTotal: KES ${total.toLocaleString()}`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <h1 className="mb-8">Shopping Cart</h1>
          
          {cartItems.length === 0 ? (
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
              <div className="lg:col-span-2">
                {/* Cart items will go here */}
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
