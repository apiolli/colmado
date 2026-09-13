import { Link } from "react-router";
import { Boxes } from "lucide-react";

export const CustomLogo = () => {
  return (
    <Link to="/" className="flex items-center gap-2.5 px-1">
      <span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground">
        <Boxes className="size-5" />
      </span>
      <span className="flex flex-col leading-none">
        <span className="text-base font-semibold tracking-tight">
          StockFlow
        </span>
        <span className="text-[11px] text-muted-foreground">
          Inventario &amp; ventas
        </span>
      </span>
    </Link>
  );
};
