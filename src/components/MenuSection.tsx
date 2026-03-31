import type { MenuCategory } from "@/data/menuData";
import MenuItemCard from "./MenuItemCard";

interface MenuSectionProps {
  category: MenuCategory;
}

const MenuSection = ({ category }: MenuSectionProps) => {
  return (
    <section id={category.id} className="py-12">
      <div className="flex items-baseline gap-4 mb-8">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
          {category.name}
        </h2>
        <span className="text-2xl text-accent/40 font-body">{category.nameJp}</span>
        <div className="flex-1 h-px bg-border/50" />
      </div>
      <div>
        {category.items.map((item) => (
          <MenuItemCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
};

export default MenuSection;
