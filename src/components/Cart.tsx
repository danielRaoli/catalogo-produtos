"use client";

import { useCart } from "@/contexts/CartContext";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CartItem } from "@/components/CartItem";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export function Cart() {
  const { items, clearCart, getTotalPrice } = useCart();

  const generateWhatsAppLink = () => {
    const phoneNumber = "5571999337977"; // Substitua pelo número do vendedor (com DDD)
    const message = encodeURIComponent(
      `🛒 *Pedido de Compra* 🛒\n\n` +
        items
          .map(
            (item) =>
              `📌 *${item.name}*\nQuantidade: ${
                item.quantity
              }\nPreço: R$ ${item.price.toFixed(2)}\n`
          )
          .join("\n") +
        `\n💰 *Total: R$ ${getTotalPrice().toFixed(2)}*`
    );

    return `https://wa.me/${phoneNumber}?text=${message}`;
  };

  const handleCheckout = () => {
    if (items.length === 0) {
      alert("Seu carrinho está vazio!");
      return;
    }

    window.open(generateWhatsAppLink(), "_blank");
  };

  return (
    <div className="flex flex-col h-full px-4">
      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full">
          <p className="text-gray-500 dark:text-golden mb-4 transition-colors duration-300">
            Seu carrinho está vazio
          </p>
          <p className="text-sm text-gray-400 transition-colors duration-300">
            Adicione produtos para continuar com a compra
          </p>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium transition-colors duration-300">
              {items.length} {items.length === 1 ? "item" : "itens"}
            </h3>
            <Button
              variant="outline"
              size="sm"
              className="text-red-500 flex items-center gap-1 dark:border-red-500 dark:text-red-400 transition-colors duration-300"
              onClick={clearCart}
            >
              <Trash2 className="h-4 w-4" />
              Limpar
            </Button>
          </div>

          <ScrollArea className="flex-1 pr-4">
            <div className="space-y-2">
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
          </ScrollArea>

          <div className="mt-6 border-t border-gray-200 dark:border-[#E1C397] pt-4 transition-colors duration-300">
            <div className="flex justify-between mb-2">
              <span className="font-medium dark:text-[#E1C397] transition-colors duration-300">
                Subtotal
              </span>
              <span className="dark:text-[#E1C397] transition-colors duration-300">
                R$ {getTotalPrice().toFixed(2)}
              </span>
            </div>
            <Button
              className="w-full bg-[#E1C397] text-black hover:bg-amber-400 mb-4 cursor-pointer transition-colors duration-300"
              onClick={handleCheckout}
            >
              Finalizar Compra
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
