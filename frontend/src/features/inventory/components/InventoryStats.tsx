import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { money, products, stockMovements } from "@/store/mock-data";

export const InventoryStats = () => {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Entradas (7 días)</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-semibold tracking-tight">
            {stockMovements
              .filter((m) => m.type === "entrada")
              .reduce((a, m) => a + m.quantity, 0)}{" "}
            u.
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Salidas (7 días)</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-semibold tracking-tight">
            {stockMovements
              .filter((m) => m.type === "salida")
              .reduce((a, m) => a + m.quantity, 0)}{" "}
            u.
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Valor del inventario</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-semibold tracking-tight">
            {money(products.reduce((a, p) => a + p.price * p.stock, 0))}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
