import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { ShoppingCart, SlidersHorizontal } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const Products = () => {
  const { addToCart } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrand, setSelectedBrand] = useState<string>("all");
  const [selectedModel, setSelectedModel] = useState<string>("all");
  const [priceRange, setPriceRange] = useState([0, 50000]);
  
  const { data: brands } = useQuery({
    queryKey: ["brands"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("brands_final_v3")
        .select("*")
        .order("brand_name");
      if (error) throw error;
      return data;
    },
  });

  const { data: models } = useQuery({
    queryKey: ["models", selectedBrand],
    queryFn: async () => {
      let query = supabase.from("models_final_v3").select("*").order("model_name");
      if (selectedBrand !== "all") {
        query = query.eq("brand_id", Number(selectedBrand));
      }
      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
    enabled: selectedBrand !== "all",
  });
  
  const { data: products, isLoading } = useQuery({
    queryKey: ["products", searchQuery, selectedBrand, selectedModel, priceRange],
    queryFn: async () => {
      let query = supabase
        .from("products_final_v3")
        .select("*")
        .gte("price_value", priceRange[0])
        .lte("price_value", priceRange[1]);
      
      if (searchQuery) {
        query = query.or(`part_name.ilike.%${searchQuery}%,brand_name.ilike.%${searchQuery}%`);
      }
      
      if (selectedBrand !== "all") {
        query = query.eq("brand_id", Number(selectedBrand));
      }
      
      if (selectedModel !== "all") {
        query = query.eq("model_id", Number(selectedModel));
      }
      
      query = query.limit(50);
      
      const { data, error } = await query;
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

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedBrand("all");
    setSelectedModel("all");
    setPriceRange([0, 50000]);
  };

  const FiltersContent = () => (
    <div className="space-y-6">
      <div>
        <Label htmlFor="search">Search</Label>
        <Input
          id="search"
          placeholder="Search parts or brands..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mt-2"
        />
      </div>

      <div>
        <Label htmlFor="brand">Brand</Label>
        <Select value={selectedBrand} onValueChange={setSelectedBrand}>
          <SelectTrigger className="mt-2">
            <SelectValue placeholder="All Brands" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Brands</SelectItem>
            {brands?.map((brand) => (
              <SelectItem key={brand.brand_id} value={String(brand.brand_id)}>
                {brand.brand_name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedBrand !== "all" && models && models.length > 0 && (
        <div>
          <Label htmlFor="model">Model</Label>
          <Select value={selectedModel} onValueChange={setSelectedModel}>
            <SelectTrigger className="mt-2">
              <SelectValue placeholder="All Models" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Models</SelectItem>
              {models?.map((model) => (
                <SelectItem key={model.model_id} value={String(model.model_id)}>
                  {model.model_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      <div>
        <Label>
          Price Range: KES {priceRange[0].toLocaleString()} - {priceRange[1].toLocaleString()}
        </Label>
        <Slider
          value={priceRange}
          onValueChange={setPriceRange}
          min={0}
          max={50000}
          step={500}
          className="mt-4"
        />
      </div>

      <Button onClick={clearFilters} variant="outline" className="w-full">
        Clear Filters
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <h1>All Products</h1>
            
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="lg:hidden">
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <FiltersContent />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            <aside className="hidden lg:block">
              <Card className="p-6 sticky top-4">
                <h3 className="font-semibold mb-4">Filters</h3>
                <FiltersContent />
              </Card>
            </aside>

            <div className="lg:col-span-3">
              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(12)].map((_, i) => (
                    <Card key={i} className="animate-pulse">
                      <div className="aspect-square bg-muted" />
                      <CardContent className="p-4">
                        <div className="h-4 bg-muted rounded mb-2" />
                        <div className="h-3 bg-muted rounded w-2/3" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : products && products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <Link to={`/products/${product.product_id}`} key={product.product_id}>
                      <Card className="group gradient-card shadow-card hover:shadow-elevated transition-smooth border-border hover:border-primary/50 h-full">
                        <div className="aspect-square overflow-hidden bg-secondary/50">
                          {product.image_url ? (
                            <img
                              src={product.image_url}
                              alt={product.part_name || "Product"}
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
                        
                        <CardFooter className="p-4 pt-0">
                          <Button 
                            className="w-full" 
                            size="sm"
                            onClick={(e) => handleAddToCart(e, product)}
                          >
                            <ShoppingCart className="mr-2 h-4 w-4" />
                            Add to Cart
                          </Button>
                        </CardFooter>
                      </Card>
                    </Link>
                  ))}
                </div>
              ) : (
                <Card className="p-12 text-center">
                  <p className="text-muted-foreground">No products found matching your filters.</p>
                  <Button onClick={clearFilters} variant="outline" className="mt-4">
                    Clear Filters
                  </Button>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Products;
