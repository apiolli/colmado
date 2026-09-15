import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { salesByCategory } from "@/store/mock-data";
import { ResponsiveContainer, Pie, Cell, Tooltip, PieChart } from "recharts";

const pieColors = [
  "var(--color-chart-1)",
  "var(--color-chart-2)",
  "var(--color-chart-3)",
  "var(--color-chart-4)",
  "var(--color-chart-5)",
  "var(--color-chart-6)",
];

export const SalesByCategory = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ventas por categoría</CardTitle>
        <CardDescription>Participación del mes</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={salesByCategory}
                dataKey="total"
                nameKey="name"
                innerRadius={54}
                outerRadius={92}
                paddingAngle={3}
                stroke="var(--color-card)"
              >
                {salesByCategory.map((entry, index) => (
                  <Cell
                    key={entry.name}
                    fill={pieColors[index % pieColors.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid var(--color-border)",
                  background: "var(--color-card)",
                  fontSize: 12,
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-1.5">
          {salesByCategory.map((c, i) => (
            <div
              key={c.name}
              className="flex items-center gap-2 text-xs text-muted-foreground"
            >
              <span
                className="size-2.5 rounded-full"
                style={{ background: pieColors[i % pieColors.length] }}
              />
              {c.name}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
