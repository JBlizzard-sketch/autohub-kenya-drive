import { useEffect } from "react";

const MAX_RECENTLY_VIEWED = 8;

export interface RecentlyViewedProduct {
  product_id: number;
  part_name: string;
  brand_name: string;
  price_value: number;
  image_url: string | null;
  viewed_at: number;
}

export const useRecentlyViewed = () => {
  const addToRecentlyViewed = (product: Omit<RecentlyViewedProduct, "viewed_at">) => {
    const stored = localStorage.getItem("autohub_recently_viewed");
    const existing: RecentlyViewedProduct[] = stored ? JSON.parse(stored) : [];
    
    // Remove if already exists
    const filtered = existing.filter(item => item.product_id !== product.product_id);
    
    // Add to beginning with timestamp
    const updated = [
      { ...product, viewed_at: Date.now() },
      ...filtered
    ].slice(0, MAX_RECENTLY_VIEWED);
    
    localStorage.setItem("autohub_recently_viewed", JSON.stringify(updated));
  };

  const getRecentlyViewed = (): RecentlyViewedProduct[] => {
    const stored = localStorage.getItem("autohub_recently_viewed");
    return stored ? JSON.parse(stored) : [];
  };

  return { addToRecentlyViewed, getRecentlyViewed };
};
