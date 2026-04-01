import { useState } from "react";
import { acaiSizes, acaiToppings, type AcaiSize, type AcaiTopping } from "@/data/menuData";
import { useCart } from "@/contexts/CartContext";
import { Check, Plus, Minus, ShoppingCart } from "lucide-react";

const toppingCategories = [
  { key: "frutas" as const, label: "Frutas", emoji: "🍓" },
  { key: "complementos" as const, label: "Complementos", emoji: "🥣" },
  { key: "caldas" as const, label: "Caldas", emoji: "🍯" },
  { key: "extras" as const, label: "Extras", emoji: "✨" },
];

const AcaiBuilder = () => {
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState<AcaiSize | null>(null);
  const [selectedToppings, setSelectedToppings] = useState<Map<string, number>>(new Map());
  const [added, setAdded] = useState(false);

  const toggleTopping = (topping: AcaiTopping) => {
    setSelectedToppings((prev) => {
      const next = new Map(prev);
      if (next.has(topping.id)) {
        next.delete(topping.id);
      } else {
        next.set(topping.id, 1);
      }
      return next;
    });
  };

  const totalToppingsPrice = Array.from(selectedToppings.entries()).reduce(
    (sum, [id, qty]) => {
      const t = acaiToppings.find((t) => t.id === id);
      return sum + (t ? t.price * qty : 0);
    },
    0
  );

  const totalPrice = (selectedSize?.price ?? 0) + totalToppingsPrice;

  const toppingNames = Array.from(selectedToppings.keys())
    .map((id) => acaiToppings.find((t) => t.id === id)?.name)
    .filter(Boolean)
    .join(", ");

  const handleAddToCart = () => {
    if (!selectedSize) return;
    const description = toppingNames
      ? `${selectedSize.size} + ${toppingNames}`
      : `${selectedSize.size} - Puro`;

    addItem({
      id: `acai-custom-${Date.now()}`,
      name: `Açaí ${selectedSize.name.replace("Açaí ", "")}`,
      description,
      price: totalPrice,
    });

    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      setSelectedSize(null);
      setSelectedToppings(new Map());
    }, 1500);
  };

  return (
    <section className="py-12">
      <div className="flex items-baseline gap-4 mb-8">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
          Monte seu Açaí
        </h2>
        <span className="text-2xl text-accent/40 font-body">🍇</span>
        <div className="flex-1 h-px bg-border/50" />
      </div>

      {/* Size selection */}
      <div className="mb-8">
        <h3 className="font-display text-lg font-semibold text-foreground mb-4">
          1. Escolha o tamanho
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {acaiSizes.map((size) => (
            <button
              key={size.id}
              onClick={() => setSelectedSize(size)}
              className={`relative p-4 rounded-lg border-2 transition-all text-left ${
                selectedSize?.id === size.id
                  ? "border-primary bg-primary/10"
                  : "border-border hover:border-primary/50 bg-card/50"
              }`}
            >
              {selectedSize?.id === size.id && (
                <Check className="absolute top-2 right-2 h-4 w-4 text-primary" />
              )}
              <p className="font-display text-base font-semibold text-foreground">
                {size.size}
              </p>
              <p className="text-xs text-muted-foreground font-body mt-1">
                {size.name.replace("Açaí ", "")}
              </p>
              <p className="font-display text-lg font-bold text-accent mt-2">
                R$ {size.price.toFixed(2).replace(".", ",")}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Toppings */}
      {selectedSize && (
        <div className="mb-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <h3 className="font-display text-lg font-semibold text-foreground mb-4">
            2. Adicione complementos <span className="text-sm text-muted-foreground font-body">(opcional)</span>
          </h3>
          {toppingCategories.map((cat) => {
            const items = acaiToppings.filter((t) => t.category === cat.key);
            return (
              <div key={cat.key} className="mb-6">
                <h4 className="font-body text-sm uppercase tracking-widest text-muted-foreground mb-3">
                  {cat.emoji} {cat.label}
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                  {items.map((topping) => {
                    const isSelected = selectedToppings.has(topping.id);
                    return (
                      <button
                        key={topping.id}
                        onClick={() => toggleTopping(topping)}
                        className={`flex items-center justify-between p-3 rounded-lg border transition-all text-sm ${
                          isSelected
                            ? "border-primary bg-primary/10 text-foreground"
                            : "border-border/50 bg-card/30 text-muted-foreground hover:border-primary/40"
                        }`}
                      >
                        <span className="font-body">{topping.name}</span>
                        <span className="font-display text-xs text-accent">
                          +R$ {topping.price.toFixed(2).replace(".", ",")}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Summary & Add to Cart */}
      {selectedSize && (
        <div className="sticky bottom-20 z-20 bg-card border border-border rounded-lg p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div>
            <p className="font-body text-sm text-muted-foreground">
              {selectedSize.size}
              {toppingNames && ` + ${toppingNames}`}
            </p>
            <p className="font-display text-2xl font-bold text-accent">
              R$ {totalPrice.toFixed(2).replace(".", ",")}
            </p>
          </div>
          <button
            onClick={handleAddToCart}
            disabled={added}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-body text-sm tracking-wider uppercase transition-all ${
              added
                ? "bg-green-600 text-white"
                : "bg-primary text-primary-foreground hover:opacity-90"
            }`}
          >
            {added ? (
              <>
                <Check className="h-4 w-4" />
                Adicionado!
              </>
            ) : (
              <>
                <ShoppingCart className="h-4 w-4" />
                Adicionar ao Carrinho
              </>
            )}
          </button>
        </div>
      )}
    </section>
  );
};

export default AcaiBuilder;
