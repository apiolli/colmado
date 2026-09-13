import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/toast";
import { ChevronDown, UserRound, BarChart3, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router";

export const UserMenu = () => {
  const navigate = useNavigate();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <button
          type="button"
          className="flex items-center gap-2 rounded-full border border-border py-1 pl-1 pr-2.5 transition-colors hover:bg-accent"
        >
          <Avatar className="size-7">
            <AvatarFallback className="bg-primary text-[11px] text-primary-foreground">
              CD
            </AvatarFallback>
          </Avatar>
          <span className="hidden text-xs font-medium sm:block">César D.</span>
          <ChevronDown className="size-3.5 text-muted-foreground" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="flex flex-col">
          <span>César Augusto Díaz</span>
          <span className="text-xs font-normal text-muted-foreground">
            cesar@stockflow.app
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <Link to={"/"}>
          <DropdownMenuItem>
            <UserRound className="size-4" /> Mi perfil
          </DropdownMenuItem>
        </Link>

        <Link to={"/"}>
          <DropdownMenuItem>
            <BarChart3 className="size-4" /> Reportes
          </DropdownMenuItem>
        </Link>

        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-destructive"
          onClick={() => {
            toast.add({
              type: "success",
              description: "Sesión cerrada correctamente",
            });
            navigate("/auth/login");
          }}
        >
          <LogOut className="size-4" /> Cerrar sesión
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
