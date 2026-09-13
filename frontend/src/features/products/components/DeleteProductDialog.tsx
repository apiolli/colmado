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
import { useDialog } from "@/hooks/useDialog";

export const DeleteProductDialog = () => {
  const { isDialogOpen, handleDialogChange } = useDialog();
  return (
    <AlertDialog
      open={isDialogOpen("delete")}
      onOpenChange={handleDialogChange}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            ¿Eliminar “{"nombre del producto"}”?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción quitará el producto del catálogo y de las listas del
            punto de venta.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => handleDialogChange(false)}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Eliminar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
