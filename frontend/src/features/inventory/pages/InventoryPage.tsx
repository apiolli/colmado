import { CustomJumbotron } from "@/shared/components/CustomJumbotron";
import { InventoryStats } from "../components/InventoryStats";
import { InventoryLastMovements } from "../components/InventoryLastMovements";
import { RecordMovement } from "../components/RecordMovement";
import { lowStock, stockMovements } from "@/store/mock-data";

export const InventoryPage = () => {
  return (
    <>
      <CustomJumbotron
        title="Movimientos de inventario"
        subtitle={`${stockMovements.length} movimientos registrados · ${lowStock.length} productos por reponer`}
      />

      <div className="grid gap-4 lg:grid-cols-[380px_1fr]">
        <RecordMovement />
        <div className="flex flex-col gap-4">
          <InventoryStats />
          <InventoryLastMovements />
        </div>
      </div>
    </>
  );
};
