import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { CustomJumbotron } from "@/shared/components/CustomJumbotron";
import { money, sales, saleTotal } from "@/store/mock-data";
import { SalesCard } from "../components/SalesCard";
import { SaleInfoSheet } from "../components/SaleInfoSheet";
import { toast } from "@/components/ui/toast";

export const SalesHistoryPage = () => {
  const [method, setMethod] = useState("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(
    () =>
      sales.filter((s) => {
        const q = query.trim().toLowerCase();
        const matchQuery =
          !q ||
          s.code.toLowerCase().includes(q) ||
          s.customer.toLowerCase().includes(q);
        const matchMethod =
          method === "all" || s.method.toLowerCase() === method;
        return matchQuery && matchMethod;
      }),
    [query, method],
  );

  return (
    <>
      <CustomJumbotron
        title="Historial de ventas"
        subtitle={`${sales.length} ventas registradas · ${money(sales.reduce((a, s) => a + saleTotal(s), 0))} facturado`}
        actions={
          <Button
            variant="outline"
            onClick={() => {
              if (filtered.length === 0) {
                toast.add({
                  type: "error",
                  description: "No hay ventas para exportar con estos filtros",
                });
                return;
              }
              toast.add({
                type: "success",
                title: "Exportación iniciada",
                description:
                  "${filtered.length} ventas se están exportando a CSV.",
              });
            }}
          >
            Exportar CSV
          </Button>
        }
      />

      <SalesCard />
      <SaleInfoSheet />
    </>
  );
};
