import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

export const PreferencesCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Preferencias</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {[
          {
            label: "Alertas de stock bajo",
            desc: "Notificar al alcanzar el mínimo",
          },
          {
            label: "Resumen diario",
            desc: "Recibir cierre de caja por correo",
          },
          {
            label: "Sonido en el POS",
            desc: "Confirmar cada venta con un tono",
          },
        ].map((p, i) => (
          <div key={p.label} className="flex flex-col gap-4">
            {i > 0 ? <Separator /> : null}
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-medium">{p.label}</p>
                <p className="text-xs text-muted-foreground">{p.desc}</p>
              </div>
              <Switch defaultChecked={i !== 2} />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
