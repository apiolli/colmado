import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "@/components/ui/toast";
import { categories, type Category } from "@/store/mock-data";
import { useState } from "react";

export const DeleteCategoryDialog = () => {
  const [list, setList] = useState<Category[]>(categories);
  const [toDelete, setToDelete] = useState<Category | null>(null);

  const confirmDelete = () => {
    if (!toDelete) return;
    const removed = toDelete;
    setList((prev) => prev.filter((c) => c.id !== removed.id));
    setToDelete(null);

    {
      /* Toast de categoria eliminada con boton de deshacer el cambio*/
    }

    // toast.success("Categoría eliminada", {
    //   description: `${removed.name} se quitó del catálogo.`,
    //   action: {
    //     label: "Deshacer",
    //     onClick: () => setList((prev) => [...prev, removed]),
    //   },
    // });

    toast.add({
      type: "success",
      title: "Categoría eliminada",
      description: `${removed.name} se quitó del catálogo.`,
    });
  };

  return (
    <AlertDialog
      open={!!toDelete}
      onOpenChange={(o) => !o && setToDelete(null)}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Eliminar “{toDelete?.name}”?</AlertDialogTitle>
          <AlertDialogDescription>
            Los {toDelete?.productCount ?? 0} productos de esta categoría
            quedarán sin clasificar.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={confirmDelete}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Eliminar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
