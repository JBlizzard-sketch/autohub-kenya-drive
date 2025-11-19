import { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";

export interface WishlistItem {
  product_id: number;
  part_name: string;
  brand_name: string;
  price_value: number;
  image_url: string | null;
}

export const useWishlist = () => {
  const [items, setItems] = useState<WishlistItem[]>(() => {
    const saved = localStorage.getItem("autohub_wishlist");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("autohub_wishlist", JSON.stringify(items));
  }, [items]);

  const addToWishlist = (product: WishlistItem) => {
    setItems((current) => {
      const exists = current.find((item) => item.product_id === product.product_id);
      
      if (exists) {
        toast({
          title: "Already in wishlist",
          description: `${product.part_name} is already saved`,
        });
        return current;
      }
      
      toast({
        title: "Added to wishlist",
        description: `${product.part_name} saved successfully`,
      });
      return [...current, product];
    });
  };

  const removeFromWishlist = (product_id: number) => {
    setItems((current) => current.filter((item) => item.product_id !== product_id));
    toast({
      title: "Removed from wishlist",
      description: "Item removed successfully",
    });
  };

  const isInWishlist = (product_id: number) => {
    return items.some((item) => item.product_id === product_id);
  };

  return { items, addToWishlist, removeFromWishlist, isInWishlist };
};
