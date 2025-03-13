"use client";

import { ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Cart } from "@/components/Cart";

export function CartHeader() {
  const items = useCart();

  return (
    <Sheet>
      <SheetTrigger asChild>
        {items.getTotalItems() > 0 ? (
          <div className="relative">
            <ShoppingBag className="text-[#E1C397] cursor-pointer text-4xl" />
            <div className="absolute -top-3 -right-3 bg-white text-black rounded-full font-bold w-6 h-6 flex items-center justify-center text-sm">
              {items.getTotalItems()}
            </div>
          </div>
        ) : (
          <ShoppingBag className="text-[#E1C397] cursor-pointer text-4xl" />
        )}
      </SheetTrigger>
      <SheetContent className="w-full md:w-1/4 overflow-y-scroll dark:bg-gray-900 dark:text-[#E1C397]">
        <SheetHeader>
          <SheetTitle className="dark:text-gray-200">Carrinho</SheetTitle>
          <SheetDescription className="dark:text-gray-400">
            Ao finalizar iremos direcionar você para fechar a venda no whatsapp
          </SheetDescription>
        </SheetHeader>

        <Cart />
      </SheetContent>
    </Sheet>
  );
}
