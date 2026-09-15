import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  TablePagination,
  usePagination,
} from "@/shared/components/TablePagination";
import { stockMovements } from "@/store/mock-data";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

export const InventoryLastMovements = () => {
  const pagination = usePagination(stockMovements, 8);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Movimientos recientes</CardTitle>
        <CardDescription>
          Últimas entradas y salidas registradas
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fecha</TableHead>
                <TableHead>Producto</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead className="text-right">Cantidad</TableHead>
                <TableHead>Motivo</TableHead>
                <TableHead>Usuario</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pagination.pageItems.map((m) => (
                <TableRow key={m.id}>
                  <TableCell className="text-muted-foreground">
                    {m.date}
                  </TableCell>
                  <TableCell className="font-medium">{m.productName}</TableCell>
                  <TableCell>
                    {m.type === "entrada" ? (
                      <Badge variant="secondary" className="gap-1">
                        <ArrowUpRight className="size-3" /> Entrada
                      </Badge>
                    ) : (
                      <Badge variant="destructive" className="gap-1">
                        <ArrowDownRight className="size-3" /> Salida
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    {m.type === "entrada" ? "+" : "-"}
                    {m.quantity}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {m.reason}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {m.user}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          page={pagination.page}
          setPage={pagination.setPage}
          pageSize={pagination.pageSize}
          setPageSize={pagination.setPageSize}
          totalPages={pagination.totalPages}
          total={pagination.total}
          label="movimientos"
        />
      </CardContent>
    </Card>
  );
};
