import { ProductList } from "@/components/ProductList";
import { getAllProducts } from "@/lib/prisma";
import { Produto } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function Home() {
  const products = (await getAllProducts()) as Produto[];

  return (
    <main className="w-full px-4 py-8 bg-white md:px-20 dark:bg-black transition-colors duration-300">
      <ProductList initialProducts={products} />
    </main>
  );
}
