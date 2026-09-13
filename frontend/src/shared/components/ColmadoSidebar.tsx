import {
  LayoutDashboard,
  Package,
  Tags,
  ShoppingCart,
  ReceiptText,
  ArrowLeftRight,
  BarChart3,
  UserRound,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router";
import { CustomLogo } from "./CustomLogo";

const nav = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/products", label: "Productos", icon: Package },
  { to: "/categories", label: "Categorías", icon: Tags },
  { to: "/new-sale", label: "Nueva venta", icon: ShoppingCart },
  { to: "/sales-history", label: "Historial", icon: ReceiptText },
  { to: "/inventory", label: "Inventario", icon: ArrowLeftRight },
  { to: "/reports", label: "Reportes", icon: BarChart3 },
  { to: "/profile", label: "Perfil", icon: UserRound },
] as const;

export const ColmadoSideBar = () => {
  const { pathname } = useLocation();

  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col gap-6 border-r border-border bg-card px-4 py-5 lg:flex">
        <CustomLogo />
        <nav className="flex flex-col gap-1">
          {nav.map((item) => {
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  pathname === item.to
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground",
                )}
              >
                <item.icon className="size-4.5 shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto rounded-xl border border-border bg-muted/60 p-3">
          <p className="text-xs font-medium">Plan Pyme</p>
          <p className="mt-1 text-[11px] text-muted-foreground">
            2 sucursales · 340 productos activos
          </p>
        </div>
      </aside>
    </>
  );
};
