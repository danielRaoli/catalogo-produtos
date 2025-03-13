"use client";

import { ListFilter, Search } from "lucide-react";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface ProductFiltersProps {
  onSearch: (value: string) => void;
  onCategoryChange: (value: string) => void;
  searchValue: string;
  selectedCategory: string;
}

const categories = [
  "Todos",
  "Eletrônicos",
  "Roupas",
  "Acessórios",
  "Utensílios",
  "Perfumes",
  "Brinquedos",
];

export function ProductFilters({
  onSearch,
  onCategoryChange,
  searchValue,
  selectedCategory,
}: ProductFiltersProps) {
  return (
    <div className="flex flex-col md:flex-row items-center gap-4">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
        <Input
          placeholder="Buscar produtos..."
          value={searchValue}
          onChange={(e) => onSearch(e.target.value)}
          className="pl-8 w-[200px] md:w-[300px]"
        />
      </div>
      <Select value={selectedCategory} onValueChange={onCategoryChange}>
        <SelectTrigger className="w-full">
          <ListFilter className="mr-2 h-4 w-4" />
          <SelectValue placeholder="Categorias" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((category) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
