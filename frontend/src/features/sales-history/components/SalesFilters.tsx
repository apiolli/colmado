import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarDays, Search } from "lucide-react";
import { useState } from "react";

export const SalesFilters = () => {
  const [from, setFrom] = useState("2026-08-13");
  const [to, setTo] = useState("2026-08-19");
  const invalidRange = !!from && !!to && from > to;

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <div className="flex flex-col gap-1.5">
        <Label className="text-xs text-muted-foreground">Desde</Label>
        <div className="relative">
          <CalendarDays className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="date"
            value={from}
            aria-invalid={invalidRange}
            onChange={(e) => setFrom(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <Label className="text-xs text-muted-foreground">Hasta</Label>
        <div className="relative">
          <CalendarDays className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="date"
            value={to}
            aria-invalid={invalidRange}
            onChange={(e) => setTo(e.target.value)}
            className="pl-9"
          />
        </div>
        {invalidRange ? (
          <p className="text-xs text-destructive">
            La fecha final debe ser posterior a la inicial.
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label className="text-xs text-muted-foreground">Método de pago</Label>
        <Select>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="efectivo">Efectivo</SelectItem>
            <SelectItem value="tarjeta">Tarjeta</SelectItem>
            <SelectItem value="qr">QR</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label className="text-xs text-muted-foreground">Buscar</Label>
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Código o cliente" className="pl-9" />
        </div>
      </div>
    </div>
  );
};
