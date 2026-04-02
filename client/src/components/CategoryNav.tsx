import { menuCategories } from "@/data/menuData";

interface CategoryNavProps {
  activeCategory: string;
  onCategoryChange: (id: string) => void;
}

const CategoryNav = ({ activeCategory, onCategoryChange }: CategoryNavProps) => {
  return (
    <nav className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm border-b border-gold py-4">
      <div className="container mx-auto px-6">
        <div className="flex gap-1 overflow-x-auto scrollbar-hide">
          {[...menuCategories, { id: "acai", name: "Monte seu Açaí", nameJp: "🍇", items: [] }].map((cat) => (
            <button
              key={cat.id}
              onClick={() => onCategoryChange(cat.id)}
              className={`whitespace-nowrap px-5 py-2 rounded-sm font-body text-sm tracking-wider transition-all ${
                activeCategory === cat.id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              <span className="mr-2 text-xs opacity-60">{cat.nameJp}</span>
              {cat.name}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default CategoryNav;
