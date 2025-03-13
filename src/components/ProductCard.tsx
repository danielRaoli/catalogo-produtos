"use client";

import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useCart } from "@/contexts/CartContext";
import { CartItem } from "@/contexts/CartContext";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  disponivel: boolean;
}

export function ProductCard({
  id,
  name,
  price,
  imageUrl,
  disponivel,
}: ProductCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    const item: CartItem = {
      id,
      name,
      price,
      quantity: 1,
      imageUrl,
    };
    addItem(item);
  };

  return (
    <Card className="h-full w-full bg-white dark:bg-gray-950 border-gray-300 dark:border-[#E1C397] p-0 transition-colors duration-300 flex flex-col">
      <div className="relative w-full">
        <AspectRatio ratio={1}>
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover rounded-t-md"
          />
          {!disponivel && (
            <div className="absolute flex items-center justify-center inset-0 bg-gray-300 opacity-60">
              <span className="text-black text-xl">Indisponível</span>
            </div>
          )}
        </AspectRatio>
      </div>
      <div className="flex flex-col flex-1 p-2">
        <span className="text-black dark:text-[#E1C397] md:hidden text-xs text-center font-semibold transition-colors duration-300">
          {name.substring(0, 18)}...
        </span>
        <span className="text-black hidden md:block dark:text-[#E1C397] text-center md:text-xl font-semibold transition-colors duration-300">
          {name}
        </span>
        <div className="flex w-full mt-auto pt-2 items-end justify-between">
          <div className="flex flex-col">
            <span className="text-gray-600 dark:text-[#E1C397] md:text-lg transition-colors duration-300">
              Preço:
            </span>
            <span className="text-black dark:text-[#E1C397] text-lg md:text-2xl transition-colors duration-300">
              R$ {price.toFixed(2)}
            </span>
          </div>
          <button
            className="bg-[#E1C397] disabled:cursor-not-allowed w-8 h-8 rounded-md hover:bg-amber-400 md:w-12 md:h-12 flex items-center justify-center text-black transition-colors duration-300 cursor-pointer p-2 md:p-3"
            onClick={handleAddToCart}
            disabled={!disponivel}
          >
            <ShoppingCart className="w-8 h-8 md:w-12 md:h-12" />
          </button>
        </div>
      </div>
    </Card>
  );
}
