import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { categories, CURRENCY } from "@/store/mock-data";

export const ProductForm = () => {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="flex flex-col gap-2 sm:col-span-2">
        <Label htmlFor="p-name">Nombre del producto</Label>
        <Input id="p-name" placeholder="Ej. Coca-Cola 2L" />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="p-sku">SKU</Label>
        <Input id="p-sku" placeholder="BEB-0012" />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="p-cat">Categoría</Label>
        <Select>
          <SelectTrigger id="p-cat">
            <SelectValue placeholder="Selecciona una categoría" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((c) => (
              <SelectItem key={c.id} value={c.id}>
                {c.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="p-price">Precio ({CURRENCY})</Label>
        <Input
          id="p-price"
          type="number"
          min={0}
          step="0.01"
          placeholder="0.00"
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="p-stock">Stock inicial</Label>
        <Input id="p-stock" type="number" min={0} placeholder="0" />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="p-min">Stock mínimo</Label>
        <Input id="p-min" type="number" min={0} placeholder="0" />
      </div>
      <div className="flex flex-col gap-2 sm:col-span-2">
        <Label htmlFor="p-desc">Descripción</Label>
        <Textarea
          id="p-desc"
          rows={3}
          placeholder="Notas internas del producto…"
        />
      </div>
    </div>
  );
};
