import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";
import { sales, money, saleTotal } from "@/store/mock-data";
import { ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router";

export const LastSales = () => {
  const navigate = useNavigate();
  return (
    <Card className="lg:col-span-2">
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <div>
          <CardTitle>Últimas ventas</CardTitle>
          <CardDescription>Transacciones más recientes</CardDescription>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/sales-history")}
        >
          Ver todas <ArrowUpRight className="size-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Código</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Pago</TableHead>
              <TableHead className="text-right">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sales.slice(0, 5).map((sale) => (
              <TableRow key={sale.id}>
                <TableCell className="font-medium">{sale.code}</TableCell>
                <TableCell className="text-muted-foreground">
                  {sale.customer}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {sale.date}
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">{sale.method}</Badge>
                </TableCell>
                <TableCell className="text-right font-medium">
                  {money(saleTotal(sale))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
