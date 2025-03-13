"use client";

import { ProductCard } from "@/components/ProductCard";
import { ProductFilters } from "@/components/ProductFilters";
import { useState, useEffect } from "react";

export interface Produto {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  disponivel: boolean;
  imagemUrl: string;
  categoria?: string;
}

interface ProductListProps {
  initialProducts: Produto[];
}

export function ProductList({ initialProducts }: ProductListProps) {
  const [products] = useState<Produto[]>(initialProducts);
  const [filteredProducts, setFilteredProducts] =
    useState<Produto[]>(initialProducts);
  const [searchValue, setSearchValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  useEffect(() => {
    let filtered = [...products];

    // Filtrar por busca
    if (searchValue) {
      filtered = filtered.filter((product) =>
        product.nome.toLowerCase().includes(searchValue.toLowerCase())
      );
    }

    // Filtrar por categoria
    if (selectedCategory !== "Todos") {
      filtered = filtered.filter(
        (product) => product.descricao === selectedCategory
      );
    }

    setFilteredProducts(filtered);
  }, [searchValue, selectedCategory, products]);

  return (
    <>
      <div className="flex justify-between mb-6">
        <h1 className="text-gray-950 dark:text-[#E1C397] font-semibold text-xl transition-colors duration-300">
          Catálogo de Produtos:
        </h1>
        <ProductFilters
          onSearch={setSearchValue}
          onCategoryChange={setSelectedCategory}
          searchValue={searchValue}
          selectedCategory={selectedCategory}
        />
      </div>
      <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id.toString()}
            name={product.nome}
            price={product.preco}
            imageUrl={product.imagemUrl}
          />
        ))}
      </div>
    </>
  );
}
