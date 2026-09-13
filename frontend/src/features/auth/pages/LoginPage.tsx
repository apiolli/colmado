import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/toast";
import { CircleAlert, Eye, EyeOff, Mail, Lock } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const LoginPage = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginErrors, setLoginErrors] = useState<{
    email?: string | undefined;
    password?: string | undefined;
  }>({});

  const signIn = () => {
    const errs: { email?: string; password?: string } = {};
    if (!emailRe.test(email.trim())) errs.email = "Ingresa un correo válido.";
    if (password.length < 8)
      errs.password = "La contraseña debe tener al menos 8 caracteres.";
    setLoginErrors(errs);

    if (Object.keys(errs).length > 0) {
      toast.add({
        type: "error",
        title: "No pudimos iniciar sesión",
        description: "Revisa los campos marcados.",
      });
      return;
    }
    toast.add({
      type: "success",
      title: "Sesión iniciada",
      description: `Bienvenido de vuelta, ${email.trim()}.`,
    });
    navigate("/");
  };

  return (
    <>
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Bienvenido de vuelta
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Ingresa tus credenciales para continuar.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="email">Correo electrónico</Label>
        <div className="relative">
          <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="email"
            className="pl-9"
            value={email}
            aria-invalid={!!loginErrors.email}
            onChange={(e) => {
              setEmail(e.target.value);
              setLoginErrors((p) => ({ ...p, email: undefined }));
            }}
          />
        </div>
        {loginErrors.email && (
          <p className="flex items-center gap-1.5 text-xs text-destructive">
            <CircleAlert className="size-3.5" /> {loginErrors.email}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Contraseña</Label>
          <button
            type="button"
            className="text-xs text-primary hover:underline"
            onClick={() =>
              emailRe.test(email.trim())
                ? toast.add({
                    type: "info",
                    title: "Enlace de recuperación enviado",
                    description: `Revisa la bandeja de ${email.trim()}.`,
                  })
                : toast.add({
                    type: "error",
                    description: "Escribe primero un correo válido",
                  })
            }
          >
            ¿Olvidaste tu contraseña?
          </button>
        </div>
        <div className="relative">
          <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="password"
            type={show ? "text" : "password"}
            className="pl-9 pr-9"
            value={password}
            aria-invalid={!!loginErrors.password}
            onChange={(e) => {
              setPassword(e.target.value);
              setLoginErrors((p) => ({ ...p, password: undefined }));
            }}
          />
          <button
            type="button"
            onClick={() => setShow((v) => !v)}
            aria-label="Mostrar contraseña"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        </div>
        {loginErrors.password && (
          <p className="flex items-center gap-1.5 text-xs text-destructive">
            <CircleAlert className="size-3.5" /> {loginErrors.password}
          </p>
        )}
      </div>

      <label className="flex items-center gap-2 text-sm text-muted-foreground">
        <Checkbox defaultChecked /> Mantener sesión abierta
      </label>

      <Button size="lg" onClick={signIn}>
        Entrar al panel
      </Button>
    </>
  );
};
