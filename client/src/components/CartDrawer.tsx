import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useCart } from "@/contexts/CartContext";
import { Minus, Plus, Trash2 } from "lucide-react";

const CartDrawer = () => {
  const { items, isOpen, setIsOpen, updateQuantity, removeItem, total, clearCart } = useCart();

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="bg-card border-border w-full sm:max-w-md flex flex-col">
        <SheetHeader>
          <SheetTitle className="font-display text-2xl text-foreground">
            Seu Pedido
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-muted-foreground font-body text-sm">Seu carrinho está vazio</p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto space-y-4 py-4">
              {items.map(({ item, quantity }) => (
                <div key={item.id} className="flex items-center gap-3 py-3 border-b border-border/50">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-display text-sm font-semibold text-foreground truncate">
                      {item.name}
                    </h4>
                    <p className="text-xs text-accent font-body">
                      R$ {item.price.toFixed(2).replace(".", ",")}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, quantity - 1)}
                      className="p-1 rounded-sm bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="font-body text-sm text-foreground w-6 text-center">{quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, quantity + 1)}
                      className="p-1 rounded-sm bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-1 text-destructive hover:text-destructive/80 ml-1"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-border/50 pt-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-display text-lg text-foreground">Total</span>
                <span className="font-display text-xl font-bold text-accent">
                  R$ {total.toFixed(2).replace(".", ",")}
                </span>
              </div>
              <button className="w-full bg-primary text-primary-foreground py-3 rounded-sm font-body text-sm tracking-widest uppercase hover:opacity-90 transition-opacity">
                Finalizar Pedido
              </button>
              <button
                onClick={clearCart}
                className="w-full text-muted-foreground py-2 font-body text-xs tracking-wider uppercase hover:text-foreground transition-colors"
              >
                Limpar Carrinho
              </button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
