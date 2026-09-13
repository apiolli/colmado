import { useNavigate } from "react-router";
import { Boxes, Check } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";

const bullets = [
  "Control de stock en tiempo real",
  "Punto de venta rápido y sin fricción",
  "Reportes de ventas por categoría",
];

export const AuthLayout = () => {
  const navigate = useNavigate();

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden flex-col justify-between overflow-hidden bg-primary p-12 text-primary-foreground lg:flex">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 size-96 rounded-full bg-primary-foreground/10 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-32 -left-16 size-96 rounded-full bg-primary-foreground/5 blur-3xl"
        />
        <div className="relative flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-xl bg-primary-foreground/15">
            <Boxes className="size-5" />
          </span>
          <span className="text-lg font-semibold tracking-tight">colmado</span>
        </div>

        <div className="relative max-w-md">
          <h2 className="text-4xl font-semibold leading-tight tracking-tight">
            Tu inventario y tus ventas, finalmente en el mismo lugar.
          </h2>
          <ul className="mt-8 flex flex-col gap-3">
            {bullets.map((b) => (
              <li
                key={b}
                className="flex items-center gap-3 text-sm opacity-90"
              >
                <span className="grid size-5 place-items-center rounded-full bg-primary-foreground/15">
                  <Check className="size-3" />
                </span>
                {b}
              </li>
            ))}
          </ul>
        </div>
        <p className="relative text-xs opacity-70">© 2026 colmado</p>
      </div>

      <div className="flex items-center justify-center bg-background px-4 py-12">
        <div className="w-full max-w-sm">
          <Tabs defaultValue="login">
            <TabsList className="w-full">
              <TabsTrigger
                value="login"
                className="flex-1"
                onClick={() => navigate("/auth/login")}
              >
                Iniciar sesión
              </TabsTrigger>
              <TabsTrigger
                value="register"
                className="flex-1"
                onClick={() => navigate("/auth/register")}
              >
                Crear cuenta
              </TabsTrigger>
            </TabsList>

            {/* Login */}
            <TabsContent value="login" className="mt-8 flex flex-col gap-5">
              <LoginPage />
            </TabsContent>

            {/* Registro */}
            <TabsContent value="register" className="mt-8 flex flex-col gap-5">
              <RegisterPage />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};
