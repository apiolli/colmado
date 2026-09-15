import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useDialog } from "@/hooks/useDialog";
import { money, saleTotal, type Sale } from "@/store/mock-data";
import { Receipt } from "lucide-react";
import { useState } from "react";
import { useSearchParams } from "react-router";

export const SaleInfoSheet = () => {
  const [selected, setSelected] = useState<Sale | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const saleDetail = searchParams.get("sale-detail") ?? undefined;

  const isDetailOpen = () => {
    return saleDetail === "open" ? true : false;
  };

  const handleDialogChange = (isOpen: boolean) => {
    if (!isOpen) setSearchParams("");
  };

  return (
    <Sheet open={isDetailOpen()} onOpenChange={handleDialogChange}>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Receipt className="size-4.5" /> {selected?.code}
          </SheetTitle>
          <SheetDescription>
            {selected?.date} · {selected?.customer}
          </SheetDescription>
        </SheetHeader>
        {selected && (
          <div className="flex flex-col gap-4 px-4 pb-6">
            <Badge variant="secondary" className="w-fit">
              Pago: {selected.method}
            </Badge>
            <Separator />
            <div className="flex flex-col gap-3">
              {selected.items.map((item) => (
                <div
                  key={item.productId}
                  className="flex items-start justify-between gap-3"
                >
                  <div>
                    <p className="text-sm font-medium">{item.productName}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.quantity} × {money(item.unitPrice)}
                    </p>
                  </div>
                  <span className="text-sm font-semibold">
                    {money(item.quantity * item.unitPrice)}
                  </span>
                </div>
              ))}
            </div>
            <Separator />
            <div className="flex items-baseline justify-between">
              <span className="text-sm font-medium">Total</span>
              <span className="text-2xl font-semibold tracking-tight">
                {money(saleTotal(selected))}
              </span>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1">
                Reimprimir
              </Button>
              <Button className="flex-1">Enviar recibo</Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
