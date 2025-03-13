"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { toast } from "sonner";

// Definindo o tipo para um item do carrinho
export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

// Interface para o contexto do carrinho
interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

// Criando o contexto
const CartContext = createContext<CartContextType | undefined>(undefined);

// Hook personalizado para usar o contexto
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart deve ser usado dentro de um CartProvider");
  }
  return context;
}

// Provider do contexto
export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [lastAction, setLastAction] = useState<{
    type: "add" | "remove" | "clear";
    item?: CartItem;
    quantity?: number;
  } | null>(null);

  useEffect(() => {
    if (lastAction) {
      switch (lastAction.type) {
        case "add":
          if (lastAction.item) {
            toast.success("Item adicionado ao carrinho 🛒", {
              description: `${lastAction.item.name} - Quantidade: ${lastAction.quantity}`,
            });
          }
          break;
        case "remove":
          if (lastAction.item) {
            toast.error("Item removido do carrinho", {
              description: lastAction.item.name,
            });
          }
          break;
        case "clear":
          toast.info("Carrinho limpo", {
            description: "Todos os itens foram removidos do carrinho",
          });
          break;
      }
      setLastAction(null);
    }
  }, [lastAction]);

  // Adicionar um item ao carrinho
  const addItem = (item: CartItem) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        setLastAction({
          type: "add",
          item,
          quantity: existingItem.quantity + 1,
        });
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      setLastAction({
        type: "add",
        item,
        quantity: 1,
      });
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  // Remover um item do carrinho
  const removeItem = (id: string) => {
    setItems((prevItems) => {
      const itemToRemove = prevItems.find((item) => item.id === id);
      if (itemToRemove) {
        setLastAction({
          type: "remove",
          item: itemToRemove,
        });
      }
      return prevItems.filter((item) => item.id !== id);
    });
  };

  // Aumentar a quantidade de um item
  const increaseQuantity = (id: string) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Diminuir a quantidade de um item
  const decreaseQuantity = (id: string) => {
    setItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Limpar o carrinho
  const clearCart = () => {
    setItems([]);
    setLastAction({ type: "clear" });
  };

  // Calcular o preço total
  const getTotalPrice = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Calcular o total de itens
  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        getTotalPrice,
        getTotalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
