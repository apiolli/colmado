import { Download, FileSpreadsheet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CustomJumbotron } from "@/shared/components/CustomJumbotron";
import { ReportsFilters } from "../components/ReportsFilters";
import { SalesTrend } from "../components/SalesTrend";
import { DetailByCategory } from "../components/DetailByCategory";

export const ReportsPage = () => {
  return (
    <>
      <CustomJumbotron
        title="Reportes"
        subtitle="Periodo: 13 – 19 de agosto, 2026"
        actions={
          <>
            <Button variant="outline">
              <FileSpreadsheet className="size-4" /> Excel
            </Button>
            <Button>
              <Download className="size-4" /> Exportar PDF
            </Button>
          </>
        }
      />
      <ReportsFilters />

      <SalesTrend />

      <DetailByCategory />
    </>
  );
};
