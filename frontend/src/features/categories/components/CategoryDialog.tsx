import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import { categories, type Category } from "@/store/mock-data";
import { useState } from "react";
import { useSearchParams } from "react-router";

type Errors = { name?: string | undefined; description?: string | undefined };

const swatches = [
  { key: "sky", token: "chart-3" },
  { key: "emerald", token: "chart-2" },
  { key: "amber", token: "chart-5" },
  { key: "violet", token: "chart-4" },
  { key: "rose", token: "chart-6" },
  { key: "orange", token: "chart-1" },
];

export const CategoryDialog = () => {
  const [list, setList] = useState<Category[]>(categories);
  const [editing, setEditing] = useState<Category | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("sky");
  const [errors, setErrors] = useState<Errors>({});

  const submit = () => {
    const found: Errors = {};
    if (name.trim().length < 3)
      found.name = "El nombre debe tener al menos 3 caracteres.";
    else if (
      list.some(
        (c) =>
          c.name.toLowerCase() === name.trim().toLowerCase() &&
          c.id !== editing?.id,
      )
    )
      found.name = "Ya existe una categoría con ese nombre.";
    if (description.trim().length < 10)
      found.description = "Describe la categoría con al menos 10 caracteres.";

    setErrors(found);
    if (Object.keys(found).length > 0) {
      toast.add({
        type: "error",
        description: "Revisa los campos marcados",
      });
      return;
    }

    if (editing) {
      setList((prev) =>
        prev.map((c) =>
          c.id === editing.id
            ? {
                ...c,
                name: name.trim(),
                description: description.trim(),
                color,
              }
            : c,
        ),
      );
      toast.add({
        type: "success",
        title: "Categoría actualizada",
        description: name.trim(),
      });
    } else {
      setList((prev) => [
        ...prev,
        {
          id: `c-${Date.now()}`,
          name: name.trim(),
          description: description.trim(),
          color,
          icon: "Package",
          productCount: 0,
        },
      ]);
      toast.add({
        type: "success",
        title: "Categoria creada",
        description: `${name.trim()} está lista para usarse.`,
      });
    }
    setSearchParams("");
  };

  const [searchParams, setSearchParams] = useSearchParams();

  const dialog = searchParams.get("dialog");

  const isDialogOpen = dialog === "open" ? true : false;

  const handleDialogChange = (isOpen: boolean) => {
    if (!isOpen) setSearchParams("");
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={handleDialogChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {editing ? "Editar categoría" : "Nueva categoría"}
          </DialogTitle>
          <DialogDescription>
            Define un nombre, color e ícono representativo.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="c-name">Nombre</Label>
            <Input
              id="c-name"
              placeholder="Ej. Congelados"
              value={name}
              maxLength={40}
              aria-invalid={!!errors.name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name ? (
              <p className="text-xs text-destructive">{errors.name}</p>
            ) : null}
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="c-desc">Descripción</Label>
            <Textarea
              id="c-desc"
              rows={3}
              maxLength={160}
              placeholder="Qué agrupa esta categoría…"
              value={description}
              aria-invalid={!!errors.description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {errors.description ? (
              <p className="text-xs text-destructive">{errors.description}</p>
            ) : (
              <p className="text-[11px] text-muted-foreground">
                {description.length}/160 caracteres
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Label>Color</Label>
            <div className="flex gap-2">
              {swatches.map((s) => (
                <button
                  key={s.key}
                  type="button"
                  aria-label={`Color ${s.key}`}
                  onClick={() => setColor(s.key)}
                  className={`size-8 rounded-lg border border-border ring-offset-2 ring-offset-background ${
                    color === s.key ? "ring-2 ring-ring" : ""
                  }`}
                  style={{ background: `var(--color-${s.token})` }}
                />
              ))}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setSearchParams("")}>
            Cancelar
          </Button>
          <Button onClick={submit}>
            {editing ? "Guardar cambios" : "Guardar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
