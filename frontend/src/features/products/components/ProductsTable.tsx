import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { categoryName, money, type Product } from "@/store/mock-data";
import { Pencil, Trash2 } from "lucide-react";
import { useSearchParams } from "react-router";

interface Props {
  pagination: {
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    pageSize: number;
    setPageSize: (n: number) => void;
    totalPages: number;
    total: number;
    pageItems: Product[];
  };
  filtered: Product[];
}

export const ProductsTable = ({ pagination, filtered }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleEditDialog = (product: Product) => {
    searchParams.set("dialog", "edit");
    setSearchParams(searchParams);
  };

  const handleDeleteDialog = (product: Product) => {
    searchParams.set("dialog", "delete");
    setSearchParams(searchParams);
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Producto</TableHead>
          <TableHead>SKU</TableHead>
          <TableHead>Categoría</TableHead>
          <TableHead className="text-right">Precio</TableHead>
          <TableHead className="text-right">Stock</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead className="text-right">Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {pagination.pageItems.map((p) => {
          const low = p.stock <= p.minStock;
          return (
            <TableRow key={p.id}>
              <TableCell className="font-medium">{p.name}</TableCell>
              <TableCell className="font-mono text-xs text-muted-foreground">
                {p.sku}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {categoryName(p.categoryId)}
              </TableCell>
              <TableCell className="text-right">{money(p.price)}</TableCell>
              <TableCell className="text-right tabular-nums">
                {p.stock}
              </TableCell>
              <TableCell>
                {low ? (
                  <Badge variant="destructive">Stock bajo</Badge>
                ) : (
                  <Badge variant="secondary">Disponible</Badge>
                )}
              </TableCell>
              <TableCell>
                <div className="flex justify-end gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Editar"
                    onClick={() => handleEditDialog(p)}
                  >
                    <Pencil className="size-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Eliminar"
                    className="text-destructive hover:text-destructive"
                    onClick={() => handleDeleteDialog(p)}
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          );
        })}
        {filtered.length === 0 ? (
          <TableRow>
            <TableCell
              colSpan={7}
              className="py-10 text-center text-muted-foreground"
            >
              No hay productos que coincidan con los filtros.
            </TableCell>
          </TableRow>
        ) : null}
      </TableBody>
    </Table>
  );
};
