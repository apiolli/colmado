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
import { useState } from "react";

const initialProfile = {
  nombre: "César Augusto Díaz",
  correo: "cesar@stockflow.app",
  tel: "+1 809 555 1234",
  negocio: "Minimarket El Sol",
};

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type ProfileErrors = Partial<
  Record<keyof typeof initialProfile, string | undefined>
>;

export const PersonalInformationCard = () => {
  const [profile, setProfile] = useState(initialProfile);
  const [errors, setErrors] = useState<ProfileErrors>({});

  const setField = (key: keyof typeof initialProfile, value: string) => {
    setProfile((p) => ({ ...p, [key]: value }));
    setErrors((p) => ({ ...p, [key]: undefined }));
  };

  const saveProfile = () => {
    const found: ProfileErrors = {};
    if (profile.nombre.trim().length < 3)
      found.nombre = "Escribe tu nombre completo.";
    if (!emailRe.test(profile.correo.trim()))
      found.correo = "Ingresa un correo válido.";
    if (profile.tel.replace(/\D/g, "").length < 8)
      found.tel = "Ingresa un teléfono válido.";
    if (profile.negocio.trim().length < 3)
      found.negocio = "Escribe el nombre del negocio.";
    setErrors(found);
    if (Object.keys(found).length > 0) {
      toast.add({
        type: "error",
        description: "Revisa los campos marcados",
      });
      return;
    }
    toast.add({
      title: "Datos guardados",
      description: "Tu información se actualizó correctamente.",
      type: "success",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Información personal</CardTitle>
        <CardDescription>
          Estos datos aparecen en los comprobantes de venta
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          {(
            [
              { key: "nombre", label: "Nombre completo" },
              { key: "correo", label: "Correo electrónico" },
              { key: "tel", label: "Teléfono" },
              { key: "negocio", label: "Negocio" },
            ] as const
          ).map((f) => (
            <div key={f.key} className="flex flex-col gap-2">
              <Label htmlFor={f.key}>{f.label}</Label>
              <Input
                id={f.key}
                value={profile[f.key]}
                maxLength={80}
                aria-invalid={!!errors[f.key]}
                onChange={(e) => setField(f.key, e.target.value)}
              />
              {errors[f.key] ? (
                <p className="text-xs text-destructive">{errors[f.key]}</p>
              ) : null}
            </div>
          ))}
        </div>
        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            onClick={() => {
              setProfile(initialProfile);
              setErrors({});
              toast.add({
                type: "info",
                description: "Cambios descartados",
              });
            }}
          >
            Descartar
          </Button>
          <Button onClick={saveProfile}>Guardar cambios</Button>
        </div>
      </CardContent>
    </Card>
  );
};
