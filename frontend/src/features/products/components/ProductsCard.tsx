import { ProductsTable } from "./ProductsTable";
import {
  TablePagination,
  usePagination,
} from "@/shared/components/TablePagination";
import { Card, CardContent } from "@/components/ui/card";

import { products, type Product } from "@/store/mock-data";

import { useMemo, useState } from "react";
import { ProductCardHeader } from "./ProductCardHeader";

export const ProductsCard = () => {
  const [list, setList] = useState<Product[]>(products);
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("all");
  const [stockFilter, setStockFilter] = useState("all");

  const filtered = useMemo(
    () =>
      list.filter((p) => {
        const q = query.trim().toLowerCase();
        const matchQuery =
          !q ||
          p.name.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q);
        const matchCat = cat === "all" || p.categoryId === cat;
        const matchStock =
          stockFilter === "all" ||
          (stockFilter === "low"
            ? p.stock <= p.minStock
            : p.stock > p.minStock);
        return matchQuery && matchCat && matchStock;
      }),
    [list, query, cat, stockFilter],
  );

  const pagination = usePagination(filtered, 8);

  return (
    <Card>
      <CardContent className="flex flex-col gap-4">
        <ProductCardHeader setPage={pagination.setPage} />
        <div className="overflow-x-auto">
          <ProductsTable pagination={pagination} filtered={filtered} />
        </div>

        <TablePagination
          page={pagination.page}
          setPage={pagination.setPage}
          pageSize={pagination.pageSize}
          setPageSize={pagination.setPageSize}
          totalPages={pagination.totalPages}
          total={pagination.total}
          label="productos"
        />
      </CardContent>
    </Card>
  );
};
