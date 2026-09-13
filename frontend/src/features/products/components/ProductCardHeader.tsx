import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories } from "@/store/mock-data";
import { Search, Filter } from "lucide-react";
import { useState } from "react";

interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export const ProductCardHeader = ({ setPage }: Props) => {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("all");
  const [stockFilter, setStockFilter] = useState("all");

  return (
    <CardHeader className="gap-4">
      <div>
        <CardTitle>Catálogo</CardTitle>
        <CardDescription>
          Filtra por nombre, SKU, categoría o nivel de stock
        </CardDescription>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            placeholder="Buscar por nombre o SKU…"
            className="pl-9"
          />
        </div>
        <Select value={cat}>
          <SelectTrigger className="sm:w-48">
            <Filter className="size-4 text-muted-foreground" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas las categorías</SelectItem>
            {categories.map((c) => (
              <SelectItem key={c.id} value={c.id}>
                {c.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={stockFilter}>
          <SelectTrigger className="sm:w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todo el stock</SelectItem>
            <SelectItem value="low">Stock bajo</SelectItem>
            <SelectItem value="ok">Stock normal</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </CardHeader>
  );
};
