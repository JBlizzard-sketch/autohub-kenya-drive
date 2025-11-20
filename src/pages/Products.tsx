import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FilterChips } from "@/components/products/FilterChips";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { ShoppingCart, SlidersHorizontal, MessageCircle, Package } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
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
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [selectedBrand, setSelectedBrand] = useState<string>("all");
  const [selectedModel, setSelectedModel] = useState<string>("all");
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    const search = searchParams.get("search");
    if (search) {
      setSearchQuery(search);
    }
  }, [searchParams]);
  
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
  
  const { data: productsData, isLoading } = useQuery({
    queryKey: ["products", searchQuery, selectedBrand, selectedModel, priceRange, currentPage],
    queryFn: async () => {
      let query = supabase
        .from("products_final_v3")
        .select("*", { count: "exact" })
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
      
      const { data, error, count } = await query.range(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage - 1
      );
      
      if (error) throw error;
      return { data, count };
    },
  });

  const products = productsData?.data;
  const totalPages = productsData?.count ? Math.ceil(productsData.count / itemsPerPage) : 0;

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

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedBrand("all");
    setSelectedModel("all");
    setPriceRange([0, 50000]);
    setCurrentPage(1);
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
              <FilterChips
                filters={[
                  ...(searchQuery ? [{
                    id: 'search',
                    label: `Search: "${searchQuery}"`,
                    onRemove: () => setSearchQuery("")
                  }] : []),
                  ...(selectedBrand !== "all" ? [{
                    id: 'brand',
                    label: `Brand: ${brands?.find(b => b.brand_id === Number(selectedBrand))?.brand_name}`,
                    onRemove: () => setSelectedBrand("all")
                  }] : []),
                  ...(selectedModel !== "all" ? [{
                    id: 'model',
                    label: `Model: ${models?.find(m => m.model_id === Number(selectedModel))?.model_name}`,
                    onRemove: () => setSelectedModel("all")
                  }] : []),
                  ...((priceRange[0] !== 0 || priceRange[1] !== 50000) ? [{
                    id: 'price',
                    label: `KES ${priceRange[0].toLocaleString()} - ${priceRange[1].toLocaleString()}`,
                    onRemove: () => setPriceRange([0, 50000])
                  }] : []),
                ]}
                onClearAll={clearFilters}
              />

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

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-8">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  
                  <div className="flex gap-1">
                    {[...Array(Math.min(5, totalPages))].map((_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }
                      
                      return (
                        <Button
                          key={pageNum}
                          variant={currentPage === pageNum ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCurrentPage(pageNum)}
                          className="w-10"
                        >
                          {pageNum}
                        </Button>
                      );
                    })}
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
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
