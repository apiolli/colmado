import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

import { CustomJumbotron } from "@/shared/components/CustomJumbotron";
import { SummaryGrid } from "../components/SummaryGrid";
import { WeekSales } from "../components/WeekSales";
import { SalesByCategory } from "../components/SalesByCategory";
import { LastSales } from "../components/LastSales";
import { StockAlerts } from "../components/StockAlerts";
import { Link, useNavigate } from "react-router";

export const DashboardPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <CustomJumbotron
        title="Dashboard"
        subtitle="Miércoles 19 de agosto, 2026 · Sucursal Centro"
        actions={
          <>
            <Button variant="outline">
              <Link to="/reports">Ver reportes</Link>
            </Button>
            <Button className="" onClick={() => navigate("/new-sale")}>
              <Plus className="size-4" /> Nueva venta
            </Button>
          </>
        }
      />

      <SummaryGrid />

      <div className="grid gap-4 lg:grid-cols-3">
        <WeekSales />
        <SalesByCategory />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <LastSales />
        <StockAlerts />
      </div>
    </>
  );
};
