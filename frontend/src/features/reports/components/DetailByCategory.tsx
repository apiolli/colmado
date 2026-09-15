import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableFooter,
  Table,
} from "@/components/ui/table";
import {
  TablePagination,
  usePagination,
} from "@/shared/components/TablePagination";
import { categories, money, salesByCategory } from "@/store/mock-data";
import { useMemo, useState } from "react";

const totalSales = salesByCategory.reduce((a, c) => a + c.total, 0);

export const DetailByCategory = () => {
  const [cat, setCat] = useState("all");
  const rows = useMemo(
    () =>
      cat === "all"
        ? salesByCategory
        : salesByCategory.filter(
            (c) => c.name === categories.find((x) => x.id === cat)?.name,
          ),
    [cat],
  );

  const pagination = usePagination(rows, 5);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Detalle por categoría</CardTitle>
        <CardDescription>
          Participación sobre el total del periodo
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Categoría</TableHead>
              <TableHead className="text-right">Ventas</TableHead>
              <TableHead className="text-right">Participación</TableHead>
              <TableHead className="text-right">Ticket promedio</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pagination.pageItems.map((c) => (
              <TableRow key={c.name}>
                <TableCell className="font-medium">{c.name}</TableCell>
                <TableCell className="text-right">{money(c.total)}</TableCell>
                <TableCell className="text-right tabular-nums">
                  {((c.total / totalSales) * 100).toFixed(1)}%
                </TableCell>
                <TableCell className="text-right">
                  {money(c.total / 42)}
                </TableCell>
              </TableRow>
            ))}
            {pagination.total === 0 && (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="py-10 text-center text-muted-foreground"
                >
                  No hay datos para los filtros seleccionados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell className="font-medium">Total</TableCell>
              <TableCell className="text-right font-semibold">
                {money(totalSales)}
              </TableCell>
              <TableCell className="text-right">100%</TableCell>
              <TableCell className="text-right">
                {money(totalSales / 252)}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
        <TablePagination
          page={pagination.page}
          setPage={pagination.setPage}
          pageSize={pagination.pageSize}
          setPageSize={pagination.setPageSize}
          totalPages={pagination.totalPages}
          total={pagination.total}
          label="categorías"
        />
      </CardContent>
    </Card>
  );
};
