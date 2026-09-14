import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { money, type CartLine } from "@/store/mock-data";
import { ShoppingCart } from "lucide-react";
import { CartContent } from "./CartContent";

const initialCart: CartLine[] = [
  { id: "p1", name: "Coca-Cola 2L", price: 12.5, qty: 2 },
  { id: "p9", name: "Papas Fritas Kiss 120g", price: 10, qty: 3 },
  { id: "p15", name: "Pan Marraqueta x6", price: 3, qty: 4 },
];

export const CartCard = () => {
  const subtotal = initialCart.reduce((acc, l) => acc + l.price * l.qty, 0);
  const discount = subtotal * 0.05;
  const total = subtotal - discount;

  return (
    <Card className="h-fit lg:sticky lg:top-24">
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <CardTitle className="flex items-center gap-2 text-base">
          <ShoppingCart className="size-4.5" /> Carrito
        </CardTitle>
        <Badge variant="secondary">{initialCart.length} ítems</Badge>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <CartContent initialCart={initialCart} />

        <Separator />

        <div className="flex flex-col gap-2">
          <Label htmlFor="cliente">Cliente</Label>
          <Input id="cliente" maxLength={60} />
          {/* {customerError && (
            <p className="text-xs text-destructive">{customerError}</p>
          )} */}
          <Label htmlFor="pago" className="mt-2">
            Método de pago
          </Label>

          {/* <Select {value={payment} onValueChange={setPayment}}>*/}

          <Select>
            <SelectTrigger id="pago">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="efectivo">Efectivo</SelectItem>
              <SelectItem value="tarjeta">Tarjeta</SelectItem>
              <SelectItem value="qr">QR</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Separator />

        <div className="flex flex-col gap-1.5 text-sm">
          <div className="flex justify-between text-muted-foreground">
            <span>Subtotal</span>
            <span>{money(subtotal)}</span>
          </div>
          <div className="flex justify-between text-muted-foreground">
            <span>Descuento (5%)</span>
            <span>-{money(discount)}</span>
          </div>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="font-medium">Total</span>
            <span className="text-2xl font-semibold tracking-tight">
              {money(total)}
            </span>
          </div>
        </div>

        <Button size="lg" className="w-full">
          Confirmar venta
        </Button>
        <Button
          variant="ghost"
          className="w-full"
          disabled={initialCart.length === 0}
        >
          Vaciar carrito
        </Button>
      </CardContent>
    </Card>
  );
};
