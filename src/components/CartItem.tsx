"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartItem as CartItemType } from "@/contexts/CartContext";
import { useCart } from "@/contexts/CartContext";

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { increaseQuantity, decreaseQuantity, removeItem } = useCart();

  return (
    <div className="flex items-center justify-between py-4 border-b border-gray-200 dark:border-[#E1C397] transition-colors duration-300">
      <div className="flex items-center gap-3">
        <div className="relative h-16 w-16 overflow-hidden rounded-md">
          <Image
            src={item.imageUrl}
            alt={item.name}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h3 className="font-medium text-sm dark:text-[#E1C397] transition-colors duration-300">
            {item.name}
          </h3>
          <p className="text-sm text-gray-500 dark:text-[#E1C397] transition-colors duration-300">
            R$ {item.price.toFixed(2)} x {item.quantity}
          </p>
          <p className="font-semibold text-sm dark:text-[#E1C397] transition-colors duration-300">
            Total: R$ {(item.price * item.quantity).toFixed(2)}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-full cursor-pointer dark:border-[#E1C397] dark:text-[#E1C397] hover:dark:bg-[#E1C397]/10 transition-colors duration-300"
          onClick={() => decreaseQuantity(item.id)}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <span className="w-6 text-center dark:text-[#E1C397] transition-colors duration-300">
          {item.quantity}
        </span>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-full cursor-pointer dark:border-[#E1C397] dark:text-[#E1C397] hover:dark:bg-[#E1C397]/10 transition-colors duration-300"
          onClick={() => increaseQuantity(item.id)}
        >
          <Plus className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-full text-red-500 ml-2 cursor-pointer dark:border-red-500 transition-colors duration-300"
          onClick={() => removeItem(item.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
