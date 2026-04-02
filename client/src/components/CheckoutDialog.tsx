import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useCart } from "@/contexts/CartContext";
import { Check, MapPin, CreditCard, Banknote, QrCode } from "lucide-react";

interface CheckoutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CheckoutDialog = ({ open, onOpenChange }: CheckoutDialogProps) => {
  const { total, clearCart, setIsOpen } = useCart();
  const [step, setStep] = useState<"form" | "confirmed">("form");
  const [address, setAddress] = useState({ street: "", number: "", complement: "", neighborhood: "", city: "" });
  const [payment, setPayment] = useState<"pix" | "credit" | "debit" | "cash">("pix");

  const paymentOptions = [
    { id: "pix" as const, label: "PIX", icon: QrCode },
    { id: "credit" as const, label: "Crédito", icon: CreditCard },
    { id: "debit" as const, label: "Débito", icon: CreditCard },
    { id: "cash" as const, label: "Dinheiro", icon: Banknote },
  ];

  const handleConfirm = () => {
    setStep("confirmed");
    setTimeout(() => {
      clearCart();
      setIsOpen(false);
      setTimeout(() => {
        onOpenChange(false);
        setStep("form");
        setAddress({ street: "", number: "", complement: "", neighborhood: "", city: "" });
      }, 2500);
    }, 3000);
  };

  const isFormValid = address.street && address.number && address.neighborhood && address.city;

  if (step === "confirmed") {
    return (
      <Dialog open={open} onOpenChange={() => {}}>
        <DialogContent className="bg-card border-border sm:max-w-md">
          <div className="flex flex-col items-center justify-center py-12 animate-scale-in">
            <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-6 animate-fade-in">
              <Check className="h-10 w-10 text-primary" />
            </div>
            <h2 className="font-display text-2xl font-bold text-foreground mb-2 animate-fade-in">
              Pedido Confirmado!
            </h2>
            <p className="text-muted-foreground font-body text-center animate-fade-in">
              Seu pedido foi realizado com sucesso.
              <br />Agradecemos pela preferência! 🔥
            </p>
            <p className="text-accent font-display text-xl font-bold mt-4 animate-fade-in">
              R$ {total.toFixed(2).replace(".", ",")}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl text-foreground">
            Finalizar Pedido
          </DialogTitle>
        </DialogHeader>

        {/* Endereço */}
        <div className="space-y-4 mt-4">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="h-5 w-5 text-primary" />
            <h3 className="font-display text-lg font-semibold text-foreground">
              Endereço de Entrega
            </h3>
          </div>
          <div className="grid grid-cols-1 gap-3">
            <input
              type="text"
              placeholder="Rua / Avenida"
              value={address.street}
              onChange={(e) => setAddress((a) => ({ ...a, street: e.target.value }))}
              className="w-full px-3 py-2 rounded-sm border border-border bg-background text-foreground font-body text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Número"
                value={address.number}
                onChange={(e) => setAddress((a) => ({ ...a, number: e.target.value }))}
                className="w-full px-3 py-2 rounded-sm border border-border bg-background text-foreground font-body text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <input
                type="text"
                placeholder="Complemento"
                value={address.complement}
                onChange={(e) => setAddress((a) => ({ ...a, complement: e.target.value }))}
                className="w-full px-3 py-2 rounded-sm border border-border bg-background text-foreground font-body text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Bairro"
                value={address.neighborhood}
                onChange={(e) => setAddress((a) => ({ ...a, neighborhood: e.target.value }))}
                className="w-full px-3 py-2 rounded-sm border border-border bg-background text-foreground font-body text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <input
                type="text"
                placeholder="Cidade"
                value={address.city}
                onChange={(e) => setAddress((a) => ({ ...a, city: e.target.value }))}
                className="w-full px-3 py-2 rounded-sm border border-border bg-background text-foreground font-body text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>
        </div>

        {/* Pagamento */}
        <div className="space-y-4 mt-6">
          <div className="flex items-center gap-2 mb-2">
            <CreditCard className="h-5 w-5 text-primary" />
            <h3 className="font-display text-lg font-semibold text-foreground">
              Forma de Pagamento
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {paymentOptions.map((opt) => {
              const Icon = opt.icon;
              return (
                <button
                  key={opt.id}
                  onClick={() => setPayment(opt.id)}
                  className={`flex items-center gap-2 p-3 rounded-sm border-2 transition-all ${
                    payment === opt.id
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <Icon className="h-4 w-4 text-accent" />
                  <span className="font-body text-sm text-foreground">{opt.label}</span>
                  {payment === opt.id && <Check className="h-3 w-3 text-primary ml-auto" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Resumo */}
        <div className="mt-6 pt-4 border-t border-border">
          <div className="flex justify-between items-center mb-4">
            <span className="font-display text-lg text-foreground">Total</span>
            <span className="font-display text-xl font-bold text-accent">
              R$ {total.toFixed(2).replace(".", ",")}
            </span>
          </div>
          <button
            onClick={handleConfirm}
            disabled={!isFormValid}
            className="w-full bg-primary text-primary-foreground py-3 rounded-sm font-body text-sm tracking-widest uppercase hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Confirmar Pedido
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutDialog;