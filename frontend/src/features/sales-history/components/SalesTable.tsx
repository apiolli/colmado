import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { money, saleTotal, type Sale } from "@/store/mock-data";
import { useSearchParams } from "react-router";

interface Props {
  pagination: {
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    pageSize: number;
    setPageSize: (n: number) => void;
    totalPages: number;
    total: number;
    pageItems: Sale[];
  };
  filtered: Sale[];
}

export const SalesTable = ({ pagination, filtered }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleOpenDetail = () => {
    searchParams.set("sale-detail", "open");
    setSearchParams(searchParams);
  };
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Código</TableHead>
            <TableHead>Fecha</TableHead>
            <TableHead>Cliente</TableHead>
            <TableHead>Pago</TableHead>
            <TableHead className="text-right">Ítems</TableHead>
            <TableHead className="text-right">Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pagination.pageItems.map((sale) => (
            <TableRow
              key={sale.id}
              className="cursor-pointer"
              onClick={() => handleOpenDetail()}
            >
              <TableCell className="font-medium">{sale.code}</TableCell>
              <TableCell className="text-muted-foreground">
                {sale.date}
              </TableCell>
              <TableCell>{sale.customer}</TableCell>
              <TableCell>
                <Badge variant="secondary">{sale.method}</Badge>
              </TableCell>
              <TableCell className="text-right tabular-nums">
                {sale.items.length}
              </TableCell>
              <TableCell className="text-right font-semibold">
                {money(saleTotal(sale))}
              </TableCell>
            </TableRow>
          ))}
          {filtered.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={6}
                className="py-10 text-center text-muted-foreground"
              >
                No hay ventas que coincidan con los filtros.
              </TableCell>
            </TableRow>
          ) : null}
        </TableBody>
      </Table>
    </div>
  );
};
