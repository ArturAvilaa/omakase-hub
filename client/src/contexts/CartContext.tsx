import { createContext, useContext, useState, ReactNode } from "react";
import type { MenuItem } from "@/data/menuData";

interface CartItem {
  item: MenuItem;
  quantity: number;
  acaiConfig?: {
    sizeId: string;
    sizeLabel: string;
    complements: string[];
    totalPrice: number;
  };
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: MenuItem, acaiConfig?: CartItem["acaiConfig"]) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | null>(null);

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be inside CartProvider");
  return ctx;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const addItem = (item: MenuItem, acaiConfig?: CartItem["acaiConfig"]) => {
    setItems((prev) => {
      if (acaiConfig) {
        const uniqueId = `${item.id}-${Date.now()}`;
        return [...prev, { item: { ...item, id: uniqueId, price: acaiConfig.totalPrice }, quantity: 1, acaiConfig }];
      }
      const existing = prev.find((ci) => ci.item.id === item.id && !ci.acaiConfig);
      if (existing) {
        return prev.map((ci) =>
          ci.item.id === item.id && !ci.acaiConfig ? { ...ci, quantity: ci.quantity + 1 } : ci
        );
      }
      return [...prev, { item, quantity: 1 }];
    });
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((ci) => ci.item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) return removeItem(id);
    setItems((prev) =>
      prev.map((ci) => (ci.item.id === id ? { ...ci, quantity } : ci))
    );
  };

  const clearCart = () => setItems([]);

  const total = items.reduce((sum, ci) => sum + ci.item.price * ci.quantity, 0);
  const itemCount = items.reduce((sum, ci) => sum + ci.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, clearCart, total, itemCount, isOpen, setIsOpen }}
    >
      {children}
    </CartContext.Provider>
  );
};
