import { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Link, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";

export const ProductSearchAutocomplete = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const { data: searchResults } = useQuery({
    queryKey: ["product-search", searchQuery],
    queryFn: async () => {
      if (!searchQuery || searchQuery.length < 2) return [];
      
      const { data, error } = await supabase
        .from("products_final_v3")
        .select("*")
        .or(`part_name.ilike.%${searchQuery}%,brand_name.ilike.%${searchQuery}%,model_name.ilike.%${searchQuery}%`)
        .limit(6);
      
      if (error) throw error;
      return data;
    },
    enabled: searchQuery.length >= 2,
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchQuery.length >= 2 && searchResults && searchResults.length > 0) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [searchQuery, searchResults]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setIsOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <div ref={searchRef} className="relative w-full">
      <form onSubmit={handleSearch}>
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
        <Input
          type="search"
          placeholder="Search parts, brands, or models..."
          className="pl-10 bg-secondary border-border"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => searchQuery.length >= 2 && setIsOpen(true)}
        />
      </form>

      {isOpen && searchResults && searchResults.length > 0 && (
        <Card className="absolute top-full left-0 right-0 mt-2 p-2 max-h-96 overflow-y-auto z-50 shadow-elevated animate-fade-in">
          <div className="space-y-1">
            {searchResults.map((product) => (
              <Link
                key={product.product_id}
                to={`/products/${product.product_id}`}
                onClick={() => {
                  setIsOpen(false);
                  setSearchQuery("");
                }}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary transition-smooth"
              >
                <div className="w-16 h-16 rounded-md overflow-hidden bg-secondary flex-shrink-0">
                  {product.image_url ? (
                    <img
                      src={product.image_url}
                      alt={product.part_name || "Product"}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
                      No Image
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm line-clamp-1">
                    {product.part_name || "Auto Part"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {product.brand_name}
                  </p>
                  <p className="text-sm font-bold text-primary mt-1">
                    KES {product.price_value?.toLocaleString() || "N/A"}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};
