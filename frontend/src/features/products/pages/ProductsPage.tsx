import { useSearchParams } from "react-router";
import { Button } from "@/components/ui/button";
import { CustomJumbotron } from "@/shared/components/CustomJumbotron";
import { ProductDialog } from "../components/ProductDialog";
import { DeleteProductDialog } from "../components/DeleteProductDialog";
import { ProductsCard } from "../components/ProductsCard";
import { Plus } from "lucide-react";

export const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const handleDialog = () => {
    searchParams.set("dialog", "new");
    setSearchParams(searchParams);
  };

  return (
    <>
      <CustomJumbotron
        title="Productos"
        subtitle={`${"cantidad de productos"} productos en el catálogo · ${"productos stock bajo"} con stock bajo`}
        actions={
          <Button onClick={handleDialog}>
            <Plus className="size-4" /> Nuevo producto
          </Button>
        }
      />

      <ProductsCard />
      <ProductDialog />
      <DeleteProductDialog />
    </>
  );
};
