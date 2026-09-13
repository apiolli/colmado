import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ProductForm } from "./ProductForm";
import { Button } from "@/components/ui/button";
import { useDialog } from "@/hooks/useDialog";

export const ProductDialog = () => {
  const { handleDialogChange, isDialogOpen } = useDialog();

  const submit = () => {
    handleDialogChange(false);
  };

  return (
    <Dialog
      open={isDialogOpen("edit", "new")}
      onOpenChange={handleDialogChange}
    >
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {isDialogOpen("edit") ? "Editar producto" : "Nuevo producto"}
          </DialogTitle>
          <DialogDescription>
            {isDialogOpen("edit")
              ? "Actualiza los datos del producto seleccionado."
              : "Completa los datos para agregarlo al catálogo."}
          </DialogDescription>
        </DialogHeader>
        <ProductForm />
        <DialogFooter>
          <Button variant="outline" onClick={() => handleDialogChange(false)}>
            Cancelar
          </Button>
          <Button onClick={submit}>
            {isDialogOpen("edit") ? "Guardar cambios" : "Guardar producto"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
