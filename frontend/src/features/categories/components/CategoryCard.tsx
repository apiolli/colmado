import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type Category } from "@/store/mock-data";
import {
  Cookie,
  Croissant,
  CupSoda,
  Milk,
  Package,
  Pencil,
  ShoppingBasket,
  SprayCan,
  Trash2,
  type LucideIcon,
} from "lucide-react";
import { useSearchParams } from "react-router";

interface Props {
  category: Category;
}

const icons: Record<string, LucideIcon> = {
  CupSoda,
  ShoppingBasket,
  SprayCan,
  Cookie,
  Milk,
  Croissant,
};

const tone: Record<string, string> = {
  sky: "bg-chart-3/15 text-chart-3",
  amber: "bg-chart-5/15 text-chart-5",
  emerald: "bg-chart-2/15 text-chart-2",
  rose: "bg-chart-6/15 text-chart-6",
  violet: "bg-chart-4/15 text-chart-4",
  orange: "bg-chart-1/15 text-chart-1",
};

export const CategoryCard = ({ category }: Props) => {
  const Icon = icons[category.icon] ?? Package;
  const [searchParams, setSearchParams] = useSearchParams();

  const handleEditDialog = (category: Category) => {
    searchParams.set("dialog", "edit");
    setSearchParams(searchParams);
  };

  const handleDeleteDialog = (category: Category) => {
    searchParams.set("dialog", "delete");
    setSearchParams(searchParams);
  };

  return (
    <Card key={category.id} className="group transition-shadow hover:shadow-md">
      <CardHeader className="flex flex-row items-start justify-between space-y-0">
        <div className="flex items-center gap-3 justify-between w-full">
          <div className="flex gap-4">
            <span
              className={`grid size-11 place-items-center rounded-xl ${tone[category.color] ?? "bg-muted text-foreground"}`}
            >
              <Icon className="size-5" />
            </span>
            <div>
              <CardTitle className="text-base">{category.name}</CardTitle>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {category.productCount} productos
              </p>
            </div>
          </div>

          <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100 focus-within:opacity-100">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Editar"
              onClick={() => handleEditDialog(category)}
            >
              <Pencil className="size-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Eliminar"
              className="text-destructive hover:text-destructive"
              onClick={() => handleDeleteDialog(category)}
            >
              <Trash2 className="size-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{category.description}</p>
      </CardContent>
    </Card>
  );
};
