import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { lowStock } from "@/store/mock-data";
import { Link } from "react-router";

export const StockAlerts = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Alertas de stock</CardTitle>
        <CardDescription>Productos por debajo del mínimo</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {lowStock.slice(0, 5).map((p) => (
          <div key={p.id} className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">{p.name}</span>
              <span className="text-destructive">
                {p.stock}/{p.minStock}
              </span>
            </div>
            <Progress value={(p.stock / p.minStock) * 100} className="h-1.5" />
            <span className="text-[11px] text-muted-foreground">
              SKU {p.sku}
            </span>
          </div>
        ))}
        <Button variant="outline" className="mt-1">
          <Link to="/inventory">Registrar entrada</Link>
        </Button>
      </CardContent>
    </Card>
  );
};
