"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="rounded-full bg-transparent border-[#E1C397] hover:bg-[#E1C397]/10"
    >
      {theme === "light" ? (
        <Moon className="h-5 w-5 text-[#E1C397]" />
      ) : (
        <Sun className="h-5 w-5 text-[#E1C397]" />
      )}
      <span className="sr-only">Alternar tema</span>
    </Button>
  );
}
