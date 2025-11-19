import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface FilterChip {
  id: string;
  label: string;
  onRemove: () => void;
}

interface FilterChipsProps {
  filters: FilterChip[];
  onClearAll?: () => void;
}

export const FilterChips = ({ filters, onClearAll }: FilterChipsProps) => {
  if (filters.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 mb-6 animate-fade-in">
      <span className="text-sm text-muted-foreground">Active filters:</span>
      {filters.map((filter) => (
        <Badge
          key={filter.id}
          variant="secondary"
          className="px-3 py-1 gap-2 cursor-pointer hover:bg-secondary/80 transition-smooth"
        >
          <span>{filter.label}</span>
          <button
            onClick={filter.onRemove}
            className="hover:text-destructive transition-colors"
          >
            <X className="h-3 w-3" />
          </button>
        </Badge>
      ))}
      {filters.length > 1 && onClearAll && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearAll}
          className="h-7 text-xs hover-scale"
        >
          Clear all
        </Button>
      )}
    </div>
  );
};
