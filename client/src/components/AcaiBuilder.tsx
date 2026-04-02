import { useState } from "react";
import { acaiSizes, acaiComplements } from "@/data/menuData";
import { useCart } from "@/contexts/CartContext";
import { toast } from "@/hooks/use-toast";
import { Check, IceCream } from "lucide-react";

const AcaiBuilder = () => {
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState(acaiSizes[0].id);
  const [selectedComplements, setSelectedComplements] = useState<string[]>([]);

  const size = acaiSizes.find((s) => s.id === selectedSize)!;
  const complementsTotal = selectedComplements.reduce((sum, id) => {
    const c = acaiComplements.find((x) => x.id === id);
    return sum + (c?.price ?? 0);
  }, 0);
  const totalPrice = size.price + complementsTotal;

  const toggleComplement = (id: string) => {
    setSelectedComplements((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleAdd = () => {
    const complementNames = selectedComplements.map(
      (id) => acaiComplements.find((c) => c.id === id)!.name
    );
    addItem(
      {
        id: "acai",
        name: `Açaí ${size.label} (${size.ml}ml)`,
        description: complementNames.length
          ? `Com: ${complementNames.join(", ")}`
          : "Açaí puro",
        price: totalPrice,
      },
      {
        sizeId: size.id,
        sizeLabel: size.label,
        complements: selectedComplements,
        totalPrice,
      }
    );
    toast({ title: "Açaí adicionado!", description: `${size.label} - R$ ${totalPrice.toFixed(2).replace(".", ",")}` });
    setSelectedComplements([]);
  };

  const frutas = acaiComplements.filter((c) => c.category === "fruta");
  const caldas = acaiComplements.filter((c) => c.category === "calda");
  const extras = acaiComplements.filter((c) => c.category === "extra");

  return (
    <section id="acai" className="py-12">
      <div className="flex items-baseline gap-4 mb-8">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
          Monte seu Açaí
        </h2>
        <span className="text-2xl text-accent/40 font-body">🍇</span>
        <div className="flex-1 h-px bg-border/50" />
      </div>

      {/* Tamanhos */}
      <div className="mb-8">
        <h3 className="font-display text-lg font-semibold text-foreground mb-4">
          Escolha o tamanho
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {acaiSizes.map((s) => (
            <button
              key={s.id}
              onClick={() => setSelectedSize(s.id)}
              className={`relative p-4 rounded-sm border-2 transition-all text-center ${
                selectedSize === s.id
                  ? "border-primary bg-primary/10"
                  : "border-border hover:border-primary/50"
              }`}
            >
              {selectedSize === s.id && (
                <Check className="absolute top-2 right-2 h-4 w-4 text-primary" />
              )}
              <IceCream className="h-6 w-6 mx-auto mb-2 text-accent" />
              <p className="font-display text-sm font-semibold text-foreground">
                {s.label}
              </p>
              <p className="text-xs text-muted-foreground font-body">{s.ml}ml</p>
              <p className="text-accent font-display font-bold mt-1">
                R$ {s.price.toFixed(2).replace(".", ",")}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Complementos */}
      {[
        { title: "Frutas", items: frutas, emoji: "🍓" },
        { title: "Caldas", items: caldas, emoji: "🍫" },
        { title: "Extras", items: extras, emoji: "✨" },
      ].map(({ title, items, emoji }) => (
        <div key={title} className="mb-6">
          <h3 className="font-display text-lg font-semibold text-foreground mb-3">
            {emoji} {title}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
            {items.map((c) => {
              const isSelected = selectedComplements.includes(c.id);
              return (
                <button
                  key={c.id}
                  onClick={() => toggleComplement(c.id)}
                  className={`px-3 py-2 rounded-sm border text-left transition-all text-sm ${
                    isSelected
                      ? "border-primary bg-primary/10 text-foreground"
                      : "border-border text-muted-foreground hover:border-primary/50"
                  }`}
                >
                  <span className="font-body font-medium">{c.name}</span>
                  <span className="block text-xs text-accent">
                    +R$ {c.price.toFixed(2).replace(".", ",")}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {/* Total e Botão */}
      <div className="flex items-center justify-between mt-8 p-4 bg-card rounded-sm border border-border">
        <div>
          <p className="text-sm text-muted-foreground font-body">Total do Açaí</p>
          <p className="font-display text-2xl font-bold text-accent">
            R$ {totalPrice.toFixed(2).replace(".", ",")}
          </p>
        </div>
        <button
          onClick={handleAdd}
          className="px-6 py-3 bg-primary text-primary-foreground rounded-sm font-body text-sm tracking-widest uppercase hover:opacity-90 transition-opacity"
        >
          Adicionar ao Pedido
        </button>
      </div>
    </section>
  );
};

export default AcaiBuilder;