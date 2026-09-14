import { CartCard } from "../components/CartCard";
import { ProductsCatalog } from "../components/ProductsCatalog";
import { CustomJumbotron } from "@/shared/components/CustomJumbotron";

export const NewSalePage = () => {
  return (
    <>
      <CustomJumbotron
        title="Nueva venta"
        subtitle="Selecciona productos del catálogo y confirma el cobro"
      />
      <div className="grid gap-4 lg:grid-cols-[1fr_380px]">
        <ProductsCatalog />

        <CartCard />
      </div>
    </>
  );
};
