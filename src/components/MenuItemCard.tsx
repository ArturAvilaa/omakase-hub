import type { MenuItem } from "@/data/menuData";

interface MenuItemCardProps {
  item: MenuItem;
}

const MenuItemCard = ({ item }: MenuItemCardProps) => {
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
      </div>
      <div className="text-right shrink-0">
        <span className="font-display text-xl font-semibold text-accent">
          R$ {item.price.toFixed(2).replace(".", ",")}
        </span>
      </div>
    </div>
  );
};

export default MenuItemCard;
