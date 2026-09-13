import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/toast";
import { User, CircleAlert } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const RegisterPage = () => {
  const navigate = useNavigate();
  const [bizName, setBizName] = useState("");
  const [rEmail, setREmail] = useState("");
  const [rPass, setRPass] = useState("");
  const [terms, setTerms] = useState(false);
  const [regErrors, setRegErrors] = useState<{
    name?: string | undefined;
    email?: string | undefined;
    pass?: string | undefined;
    terms?: string | undefined;
  }>({});

  const strength =
    rPass.length >= 12 ? 3 : rPass.length >= 8 ? 2 : rPass.length > 0 ? 1 : 0;
  const strengthLabel = ["", "Débil", "Media", "Fuerte"][strength];

  const signUp = () => {
    const errs: {
      name?: string;
      email?: string;
      pass?: string;
      terms?: string;
    } = {};
    if (bizName.trim().length < 3)
      errs.name = "Escribe el nombre de tu negocio.";
    if (!emailRe.test(rEmail.trim())) errs.email = "Ingresa un correo válido.";
    if (rPass.length < 8) errs.pass = "Usa al menos 8 caracteres.";
    if (!terms) errs.terms = "Debes aceptar los términos para continuar.";
    setRegErrors(errs);

    if (Object.keys(errs).length > 0) {
      toast.add({
        type: "warning",
        description: "Faltan datos para crear la cuenta",
      });
      return;
    }
    toast.add({
      type: "success",
      title: "Cuenta creata",
      description: `${bizName.trim()} ya puede vender.`,
    });
    navigate("/");
  };
  return (
    <>
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Crea tu cuenta
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Empieza a controlar tu negocio hoy mismo.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="name">Nombre del negocio</Label>
        <div className="relative">
          <User className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="name"
            className="pl-9"
            placeholder="Minimarket El Sol"
            value={bizName}
            maxLength={60}
            aria-invalid={!!regErrors.name}
            onChange={(e) => {
              setBizName(e.target.value);
              setRegErrors((p) => ({ ...p, name: undefined }));
            }}
          />
        </div>
        {regErrors.name && (
          <p className="flex items-center gap-1.5 text-xs text-destructive">
            <CircleAlert className="size-3.5" /> {regErrors.name}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="remail">Correo electrónico</Label>
        <Input
          id="remail"
          placeholder="correo@negocio.com"
          value={rEmail}
          aria-invalid={!!regErrors.email}
          onChange={(e) => {
            setREmail(e.target.value);
            setRegErrors((p) => ({ ...p, email: undefined }));
          }}
        />
        {regErrors.email && (
          <p className="flex items-center gap-1.5 text-xs text-destructive">
            <CircleAlert className="size-3.5" /> {regErrors.email}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="rpass">Contraseña</Label>
        <Input
          id="rpass"
          type="password"
          value={rPass}
          aria-invalid={!!regErrors.pass}
          onChange={(e) => {
            setRPass(e.target.value);
            setRegErrors((p) => ({ ...p, pass: undefined }));
          }}
        />
        <div className="flex items-center gap-2">
          {[1, 2, 3].map((i) => (
            <span
              key={i}
              className={`h-1 flex-1 rounded-full ${
                strength >= i
                  ? strength === 1
                    ? "bg-destructive"
                    : strength === 2
                      ? "bg-chart-5"
                      : "bg-chart-2"
                  : "bg-border"
              }`}
            />
          ))}
          <span className="w-12 text-[11px] text-muted-foreground">
            {strengthLabel}
          </span>
        </div>
        {regErrors.pass && (
          <p className="flex items-center gap-1.5 text-xs text-destructive">
            <CircleAlert className="size-3.5" /> {regErrors.pass}
          </p>
        )}
      </div>

      <label className="flex items-start gap-2 text-xs text-muted-foreground">
        <Checkbox
          className="mt-0.5"
          checked={terms}
          onCheckedChange={(v) => {
            setTerms(v === true);
            setRegErrors((p) => ({ ...p, terms: undefined }));
          }}
        />{" "}
        Acepto los términos de servicio y la política de privacidad de
        StockFlow.
      </label>
      {regErrors.terms && (
        <p className="flex items-center gap-1.5 text-xs text-destructive">
          <CircleAlert className="size-3.5" /> {regErrors.terms}
        </p>
      )}

      <Button size="lg" onClick={signUp}>
        Crear cuenta
      </Button>
    </>
  );
};
