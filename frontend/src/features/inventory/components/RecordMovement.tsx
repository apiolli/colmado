import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { products } from "@/store/mock-data";
import { PackagePlus } from "lucide-react";

const reasonLabels: Record<string, string> = {
  compra: "Compra proveedor",
  ajuste: "Ajuste de inventario",
  merma: "Merma / dañado",
  devolucion: "Devolución de cliente",
};

export const RecordMovement = () => {
  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <PackagePlus className="size-4.5" /> Registrar movimiento
        </CardTitle>
        <CardDescription>Entrada por compra, ajuste o merma</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="m-prod">Producto</Label>
          <Select>
            <SelectTrigger id="m-prod">
              <SelectValue placeholder="Selecciona un producto" />
            </SelectTrigger>
            <SelectContent>
              {products.map((p) => (
                <SelectItem key={p.id} value={p.id}>
                  {p.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {/* {errors.product && (
            <p className="text-xs text-destructive">{errors.product}</p>
          )} */}
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-2">
            <Label htmlFor="m-type">Tipo</Label>
            <Select>
              <SelectTrigger id="m-type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="entrada">Entrada</SelectItem>
                <SelectItem value="salida">Salida</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="m-qty">Cantidad</Label>
            <Input id="m-qty" type="number" min={1} placeholder="0" />
          </div>
          {/* {errors.quantity && (
            <p className="col-span-2 text-xs text-destructive">
              {errors.quantity}
            </p>
          ) } */}
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="m-reason">Motivo</Label>
          <Select>
            <SelectTrigger id="m-reason">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(reasonLabels).map(([value, label]) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="m-note">Nota</Label>
          <Textarea
            id="m-note"
            rows={3}
            maxLength={200}
            placeholder="Observaciones opcionales…"
          />
          <p className="text-[11px] text-muted-foreground">0/200 caracteres</p>
        </div>
        <Button size="lg">Registrar movimiento</Button>
      </CardContent>
    </Card>
  );
};
