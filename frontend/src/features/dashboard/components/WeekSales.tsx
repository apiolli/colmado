import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { salesTrend } from "@/store/mock-data";
import {
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  BarChart,
} from "recharts";

export const WeekSales = () => {
  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle>Ventas de la semana</CardTitle>
        <CardDescription>Monto facturado por día (RD$)</CardDescription>
      </CardHeader>
      <CardContent className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={salesTrend} barSize={28}>
            <CartesianGrid vertical={false} stroke="var(--color-border)" />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              fontSize={12}
              stroke="var(--color-muted-foreground)"
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              fontSize={12}
              stroke="var(--color-muted-foreground)"
            />
            <Tooltip
              contentStyle={{
                borderRadius: 12,
                border: "1px solid var(--color-border)",
                background: "var(--color-card)",
                fontSize: 12,
              }}
            />
            <Bar
              dataKey="ventas"
              fill="var(--color-primary)"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
