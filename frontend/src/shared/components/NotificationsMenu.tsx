import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/toast";
import { notifications } from "@/store/mock-data";
import { cn } from "cn";
import {
  Bell,
  CheckCheck,
  Info,
  ReceiptText,
  TriangleAlert,
} from "lucide-react";
import { useState } from "react";

const notifIcon = {
  stock: TriangleAlert,
  venta: ReceiptText,
  sistema: Info,
} as const;

export const NotificationsMenu = () => {
  const [items, setItems] = useState(notifications);
  const unread = items.filter((n) => n.unread).length;
  return (
    <Popover>
      <PopoverTrigger>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Notificaciones"
          className="relative"
        >
          <Bell className="size-5" />
          {unread > 0 && (
            <span className="absolute -right-0.5 -top-0.5 grid min-w-4 place-items-center rounded-full bg-destructive px-1 text-[10px] font-semibold leading-4 text-destructive-foreground">
              {unread}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-85 p-0 gap-0">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold">Notificaciones</p>
            <Badge variant="secondary" className="text-[10px]">
              {unread} sin leer
            </Badge>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 px-2 text-xs"
            disabled={unread === 0}
            onClick={() => {
              setItems((prev) => prev.map((n) => ({ ...n, unread: false })));
              toast.add({
                type: "success",
                description: "Notificaciones marcadas como leídas",
              });
            }}
          >
            <CheckCheck className="size-3.5" /> Leer todas
          </Button>
        </div>

        <Separator className="" />
        <ScrollArea className="h-60">
          <div className="flex flex-col">
            {items.map((n) => {
              const Icon = notifIcon[n.kind];
              return (
                <button
                  key={n.id}
                  type="button"
                  onClick={() => {
                    setItems((prev) =>
                      prev.map((x) =>
                        x.id === n.id ? { ...x, unread: false } : x,
                      ),
                    );
                    toast.add({
                      title: n.title,
                      description: n.detail,
                    });
                  }}
                  className={cn(
                    "flex gap-3 border-b border-border px-4 py-3 text-left transition-colors last:border-0 hover:bg-accent",
                    n.unread && "bg-primary/5",
                  )}
                >
                  <span
                    className={cn(
                      "mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg",
                      n.kind === "stock"
                        ? "bg-destructive/10 text-destructive"
                        : "bg-primary/10 text-primary",
                    )}
                  >
                    <Icon className="size-4" />
                  </span>
                  <span className="flex min-w-0 flex-col gap-0.5">
                    <span className="text-sm font-medium leading-snug">
                      {n.title}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {n.detail}
                    </span>
                    <span className="text-[11px] text-muted-foreground/80">
                      {n.time}
                    </span>
                  </span>
                  {n.unread ? (
                    <span className="mt-2 size-2 shrink-0 rounded-full bg-primary" />
                  ) : null}
                </button>
              );
            })}
            {items.length === 0 ? (
              <p className="py-10 text-center text-sm text-muted-foreground">
                Sin notificaciones
              </p>
            ) : null}
          </div>
        </ScrollArea>
        <Separator />

        <div className="p-2">
          <Button
            variant="ghost"
            className="w-full text-xs"
            onClick={() => {
              setItems([]);
              toast.add({
                type: "success",
                description: "Bandeja de notificaciones vaciada",
              });
            }}
          >
            Limpiar todo
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
