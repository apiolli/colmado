import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories, categoryName, money, products } from "@/store/mock-data";
import { Search, Package } from "lucide-react";

export const ProductsCatalog = () => {
  return (
    <Card>
      <CardHeader className="gap-3">
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar producto o escanear SKU…"
              className="pl-9"
            />
          </div>
          <Select>
            <SelectTrigger className="sm:w-44">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              {categories.map((c) => (
                <SelectItem key={c.id} value={c.id}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {products.map((p) => (
            <button
              key={p.id}
              type="button"
              className="flex flex-col gap-3 rounded-xl border border-border bg-card p-3 text-left transition-all hover:border-primary hover:shadow-md"
            >
              <div className="grid h-20 place-items-center rounded-lg bg-muted text-muted-foreground">
                <Package className="size-7" />
              </div>
              <div>
                <p className="line-clamp-1 text-sm font-medium">{p.name}</p>
                <p className="text-[11px] text-muted-foreground">
                  {categoryName(p.categoryId)} · {p.stock} u.
                </p>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold">{money(p.price)}</span>
                {p.stock <= p.minStock ? (
                  <Badge variant="destructive" className="text-[10px]">
                    Bajo
                  </Badge>
                ) : null}
              </div>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
