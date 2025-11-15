import { ShoppingCart, Search, User, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { itemCount } = useCart();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-lg bg-gradient-orange flex items-center justify-center">
              <span className="text-xl font-bold text-primary-foreground">AH</span>
            </div>
            <span className="text-xl font-bold hidden sm:inline">
              Auto<span className="text-primary">Hub</span>
            </span>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-xl">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search parts, brands, or models..."
                className="pl-10 bg-secondary border-border"
              />
            </div>
          </div>

          {/* Navigation Icons */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild className="hidden md:flex">
              <Link to="/auth">
                <User className="h-5 w-5" />
              </Link>
            </Button>
            
            <Button variant="ghost" size="icon" asChild className="relative">
              <Link to="/cart">
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  >
                    {itemCount}
                  </Badge>
                )}
              </Link>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Search Bar - Mobile */}
        <div className="mt-4 md:hidden">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search parts..."
              className="pl-10 bg-secondary border-border"
            />
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="mt-4 md:hidden border-t border-border pt-4">
            <nav className="flex flex-col gap-2">
              <Button variant="ghost" className="justify-start" asChild>
                <Link to="/">Home</Link>
              </Button>
              <Button variant="ghost" className="justify-start" asChild>
                <Link to="/products">Products</Link>
              </Button>
              <Button variant="ghost" className="justify-start" asChild>
                <Link to="/auth">Account</Link>
              </Button>
            </nav>
          </div>
        )}
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:block border-t border-border">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-1 py-2">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/">Home</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/products">All Parts</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/categories">Categories</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/products?category=engine">Engine Parts</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/products?category=brakes">Brakes</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/products?category=suspension">Suspension</Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};

