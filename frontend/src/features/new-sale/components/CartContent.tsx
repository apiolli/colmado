import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { money, type CartLine } from "@/store/mock-data";
import { Trash2, Minus, Plus } from "lucide-react";

interface Props {
  initialCart: CartLine[];
}

export const CartContent = ({ initialCart }: Props) => {
  return (
    <ScrollArea className="h-80 rounded-lg border border-dashed border-border p-2 pr-3">
      <div className="flex flex-col gap-3">
        {initialCart.map((l) => (
          <div key={l.id} className="rounded-lg border border-border p-3">
            <div className="flex items-start justify-between gap-2">
              <p className="text-sm font-medium">{l.name}</p>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Quitar"
                className="size-7 text-destructive hover:text-destructive"
              >
                <Trash2 className="size-3.5" />
              </Button>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Button
                  variant="outline"
                  size="icon"
                  className="size-7"
                  aria-label="Disminuir"
                >
                  <Minus className="size-3.5" />
                </Button>
                <span className="w-8 text-center text-sm tabular-nums">
                  {l.qty}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  className="size-7"
                  aria-label="Aumentar"
                >
                  <Plus className="size-3.5" />
                </Button>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold">
                  {money(l.price * l.qty)}
                </p>
                <p className="text-[11px] text-muted-foreground">
                  {money(l.price)} c/u
                </p>
              </div>
            </div>
          </div>
        ))}
        {initialCart.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">
            El carrito está vacío. Toca un producto para agregarlo.
          </p>
        ) : null}
      </div>
    </ScrollArea>
  );
};
