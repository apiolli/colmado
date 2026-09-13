import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CustomJumbotron } from "@/shared/components/CustomJumbotron";
import { categories } from "@/store/mock-data";
import { CategoriesGrid } from "../components/CategoriesGrid";
import { CategoryDialog } from "../components/CategoryDialog";
import { DeleteCategoryDialog } from "../components/DeleteCategoryDialog";
import { useSearchParams } from "react-router";

export const CategoriesPage = () => {
  const [searchParams, setSearchParamas] = useSearchParams();

  const handleNewCategoryDialog = () => {
    searchParams.set("dialog", "new");
    setSearchParamas(searchParams);
  };

  return (
    <>
      <CustomJumbotron
        title="Categorías"
        subtitle={`${categories.length} categorías activas para clasificar tu catálogo`}
        actions={
          <Button onClick={handleNewCategoryDialog}>
            <Plus className="size-4" /> Nueva categoría
          </Button>
        }
      ></CustomJumbotron>

      {/* Grid */}
      <CategoriesGrid categories={categories} />

      {/* Dialogo para crear categoria */}
      <CategoryDialog />

      {/* Alerta para eliminar */}
      <DeleteCategoryDialog />
    </>
  );
};
