import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/toast";
import { ShieldCheck } from "lucide-react";
import { useState } from "react";

type PassErrors = Partial<
  Record<"actual" | "nueva" | "repetir", string | undefined>
>;

export const ChangePasswordCard = () => {
  const [pass, setPass] = useState({ actual: "", nueva: "", repetir: "" });
  const [passErrors, setPassErrors] = useState<PassErrors>({});

  const updatePassword = () => {
    const found: PassErrors = {};
    if (pass.actual.length < 8) found.actual = "Ingresa tu contraseña actual.";
    if (pass.nueva.length < 8) found.nueva = "Usa al menos 8 caracteres.";
    else if (!/\d/.test(pass.nueva))
      found.nueva = "Incluye al menos un número.";
    if (pass.repetir !== pass.nueva)
      found.repetir = "Las contraseñas no coinciden.";
    setPassErrors(found);
    if (Object.keys(found).length > 0) {
      toast.add({
        type: "error",
        description: "No se pudo actualizar la contraseña",
      });
      return;
    }
    setPass({ actual: "", nueva: "", repetir: "" });
    toast.add({
      title: "Contraseña actualizada",
      description: "Úsala en tu próximo inicio de sesión.",
    });
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShieldCheck className="size-4.5" /> Cambiar contraseña
        </CardTitle>
        <CardDescription>
          Usa al menos 8 caracteres con números y símbolos
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="actual">Contraseña actual</Label>
          <Input
            id="actual"
            type="password"
            placeholder="••••••••"
            value={pass.actual}
            aria-invalid={!!passErrors.actual}
            onChange={(e) => {
              setPass((p) => ({ ...p, actual: e.target.value }));
              setPassErrors((p) => ({ ...p, actual: undefined }));
            }}
          />
          {passErrors.actual ? (
            <p className="text-xs text-destructive">{passErrors.actual}</p>
          ) : null}
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="nueva">Nueva contraseña</Label>
            <Input
              id="nueva"
              type="password"
              placeholder="••••••••"
              value={pass.nueva}
              aria-invalid={!!passErrors.nueva}
              onChange={(e) => {
                setPass((p) => ({ ...p, nueva: e.target.value }));
                setPassErrors((p) => ({ ...p, nueva: undefined }));
              }}
            />
            {passErrors.nueva ? (
              <p className="text-xs text-destructive">{passErrors.nueva}</p>
            ) : null}
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="repetir">Confirmar contraseña</Label>
            <Input
              id="repetir"
              type="password"
              placeholder="••••••••"
              value={pass.repetir}
              aria-invalid={!!passErrors.repetir}
              onChange={(e) => {
                setPass((p) => ({ ...p, repetir: e.target.value }));
                setPassErrors((p) => ({ ...p, repetir: undefined }));
              }}
            />
            {passErrors.repetir ? (
              <p className="text-xs text-destructive">{passErrors.repetir}</p>
            ) : null}
          </div>
        </div>
        <div className="flex justify-end">
          <Button onClick={updatePassword}>Actualizar contraseña</Button>
        </div>
      </CardContent>
    </Card>
  );
};
