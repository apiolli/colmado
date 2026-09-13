import { Plus } from "lucide-react";
import { useState } from "react";

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
import { Button } from "@/components/ui/button";
import { CustomJumbotron } from "@/shared/components/CustomJumbotron";
import { categories, type Category } from "@/store/mock-data";
import { toast } from "@/components/ui/toast";
import { CategoriesGrid } from "../components/CategoriesGrid";
import { CategoryDialog } from "../components/CategoryDialog";
import { DeleteCategoryDialog } from "../components/DeleteCategoryDialog";
import { useSearchParams } from "react-router";

type Errors = { name?: string | undefined; description?: string | undefined };

export const CategoriesPage = () => {
  const [list, setList] = useState<Category[]>(categories);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("sky");
  const [errors, setErrors] = useState<Errors>({});
  const [toDelete, setToDelete] = useState<Category | null>(null);

  const [searchParams, setSearchParamas] = useSearchParams();

  const openCreate = () => {
    setEditing(null);
    setName("");
    setDescription("");
    setColor("sky");
    setErrors({});

    searchParams.set("dialog", "open");
    setSearchParamas(searchParams);
  };

  return (
    <>
      <CustomJumbotron
        title="Categorías"
        subtitle={`${list.length} categorías activas para clasificar tu catálogo`}
        actions={
          <Button onClick={openCreate}>
            <Plus className="size-4" /> Nueva categoría
          </Button>
        }
      ></CustomJumbotron>

      {/* Grid */}
      <CategoriesGrid categories={list} />

      {/* Dialogo para crear categoria */}
      <CategoryDialog />

      {/* Alerta para eliminar */}
      <DeleteCategoryDialog />
    </>
  );
};
