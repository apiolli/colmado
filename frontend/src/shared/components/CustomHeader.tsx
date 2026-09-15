import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, Search } from "lucide-react";
import { ColmadoSideBar } from "./ColmadoSidebar";
import { CustomLogo } from "./CustomLogo";
import { NotificationsMenu } from "./NotificationsMenu";
import { UserMenu } from "./UserMenu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export const CustomHeader = () => {
  const [open, setOpen] = useState(false);

  // const [searchParams, setSearchParams] = useSearchParams();
  // const sheet = searchParams.get("sheet") ?? undefined;

  // const isSheetOpen = () => {
  //   return she === "open" ? true : false;
  // };

  // const handleDialogChange = (isOpen: boolean) => {
  //   if (!isOpen) setSearchParams("");
  // };

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-border bg-card/85 px-4 backdrop-blur md:px-6">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            aria-label="Abrir menú"
          >
            <Menu className="size-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-72 p-4">
          <SheetTitle className="sr-only">Navegación</SheetTitle>
          <div className="mb-6">
            <CustomLogo />
          </div>
          <ColmadoSideBar />
        </SheetContent>
      </Sheet>

      <form className="relative hidden max-w-sm flex-1 md:block">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Buscar productos, ventas, SKU…" className="pl-9" />
      </form>

      <div className="ml-auto flex items-center gap-2">
        <NotificationsMenu />
        <UserMenu />
      </div>
    </header>
  );
};
