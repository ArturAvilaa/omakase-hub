import type { MenuItem } from "@/data/menuData";
import { useCart } from "@/contexts/CartContext";
import StarRating from "./StarRating";
import { Plus } from "lucide-react";

interface MenuItemCardProps {
  item: MenuItem;
}

const MenuItemCard = ({ item }: MenuItemCardProps) => {
  const { addItem } = useCart();

  return (
    <div className="group flex justify-between items-start gap-4 py-5 border-b border-border/50 hover:bg-card/50 px-4 -mx-4 rounded-sm transition-colors">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 mb-1">
          <h3 className="font-display text-lg font-semibold text-foreground">
            {item.name}
          </h3>
          {item.nameJp && (
            <span className="text-xs text-muted-foreground font-body">
              {item.nameJp}
            </span>
          )}
          {item.tag && (
            <span className="text-[10px] uppercase tracking-widest font-body px-2 py-0.5 bg-primary/20 text-accent rounded-sm">
              {item.tag}
            </span>
          )}
        </div>
        <p className="text-sm text-muted-foreground font-body leading-relaxed">
          {item.description}
        </p>
        {item.pieces && (
          <span className="text-xs text-muted-foreground/70 font-body mt-1 inline-block">
            {item.pieces} peças
          </span>
        )}
        <StarRating itemId={item.id} />
      </div>
      <div className="text-right shrink-0 flex flex-col items-end gap-2">
        <span className="font-display text-xl font-semibold text-accent">
          R$ {item.price.toFixed(2).replace(".", ",")}
        </span>
        <button
          onClick={() => addItem(item)}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-primary-foreground rounded-sm font-body text-xs tracking-wider uppercase hover:opacity-90 transition-opacity"
        >
          <Plus className="h-3 w-3" />
          Adicionar
        </button>
      </div>
    </div>
  );
};

export default MenuItemCard;
