import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  TablePagination,
  usePagination,
} from "@/shared/components/TablePagination";
import { SalesTable } from "./SalesTable";
import { SalesFilters } from "./SalesFilters";
import { sales } from "@/store/mock-data";
import { useMemo, useState } from "react";

export const SalesCard = () => {
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

  const pagination = usePagination(filtered, 8);
  return (
    <Card>
      <CardHeader className="gap-4">
        <div>
          <CardTitle>Ventas</CardTitle>
          <CardDescription>
            Haz clic en una fila para ver el detalle
          </CardDescription>
        </div>

        <SalesFilters />
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <SalesTable filtered={filtered} pagination={pagination} />
        <TablePagination
          page={pagination.page}
          setPage={pagination.setPage}
          pageSize={pagination.pageSize}
          setPageSize={pagination.setPageSize}
          totalPages={pagination.totalPages}
          total={pagination.total}
          label="ventas"
        />
      </CardContent>
    </Card>
  );
};
