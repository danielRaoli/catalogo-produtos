import { Produto } from "@/lib/types";
import { Button } from "./ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerFooter } from "./ui/drawer";
import { CartItem, useCart } from "@/contexts/CartContext";
import Image from "next/image";
import { useEffect, useState } from "react";

interface ProductDetailsProps {
  product: Produto | null;
  onOpenChange: () => void;
}

export default function ProductDetails({
  product,
  onOpenChange,
}: ProductDetailsProps) {
  const [selectedImage, setSelectedImage] = useState("");
  const { addItem } = useCart();

  useEffect(() => {
    if (!product) {
      setSelectedImage("");
    } else {
      setSelectedImage(product.imagemUrl);
    }
  }, [product]);

  const handleAddToCart = () => {
    if (!product) return;
    const item: CartItem = {
      id: product.id.toString(),
      name: product.nome,
      price: product.preco,
      quantity: 1,
      imageUrl: product.imagemUrl,
    };
    addItem(item);
  };

  return (
    <>
      <Drawer
        open={product !== null}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            onOpenChange();
          }
        }}
      >
        <DrawerContent className="md:h-[90%]">
          <div className="w-full flex flex-col overflow-y-scroll">
            <div className="w-full flex flex-col md:flex-row-reverse md:justify-center  md:gap-4 items-center md:items-start">
              <div className="h-[250px] w-[300px] md:w-[400px] md:h-[400px] relative">
                <Image
                  src={selectedImage}
                  alt="imagem do produto"
                  className="object-cover rounded-md"
                  fill
                />
              </div>
              <div className="grid grid-cols-4 md:grid-cols-1 gap-2 mt-4">
                <Image
                  src={product ? product.imagemUrl : "/logo.png"}
                  alt="imagem do produto"
                  className="object-cover rounded-md "
                  fill
                  onClick={() =>
                    setSelectedImage(product ? product.imagemUrl : "/logo.png")
                  }
                />
                {product &&
                  product.imagens.map((image) => (
                    <div
                      key={image.id}
                      className="w-14 h-14 relative cursor-pointer"
                    >
                      <Image
                        src={image.url}
                        alt="imagem do produto"
                        className="object-cover rounded-md "
                        fill
                        onClick={() => setSelectedImage(image.url)}
                      />
                    </div>
                  ))}
              </div>
            </div>
            <div className="mt-4">
              <p className="text-center md:text-xl text-lg font-semibold">
                {product ? product.nome : ""}
              </p>
              <p className="text-center text-lg">
                {product?.preco.toFixed(2)} R$
              </p>
            </div>
            <DrawerFooter className="w-full flex flex-col items-center">
              <Button
                onClick={handleAddToCart}
                className="bg-gray-800 text-white w-full max-w-[400px]"
              >
                Adicionar Ao Carrinho
              </Button>
              <DrawerClose className="w-full">
                <Button
                  variant="outline"
                  className="bg-gray-600 text-white   w-full max-w-[400px]"
                  onClick={onOpenChange}
                >
                  Fechar
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
      ;
    </>
  );
}
