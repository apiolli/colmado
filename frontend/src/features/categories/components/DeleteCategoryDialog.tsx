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
import { useDialog } from "../hooks/useDialog";

export const DeleteCategoryDialog = () => {
  const { isDialogOpen, handleDialogChange } = useDialog();

  const confirmDelete = () => {
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
      description: `{Nombre categoria} se quitó del catálogo.`,
    });
    handleDialogChange(false);
  };

  return (
    <AlertDialog
      open={isDialogOpen("delete")}
      onOpenChange={handleDialogChange}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            ¿Eliminar “{"categoria a eliminar"}”?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Los {"cantidad de productos"} productos de esta categoría quedarán
            sin clasificar.
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
