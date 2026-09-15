import {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { summary } from "@/store/mock-data";

export const SummaryGrid = () => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {summary.map((item) => (
        <Card key={item.label} className="gap-0">
          <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
            <CardDescription>{item.label}</CardDescription>
            <span
              className={
                item.trend === "down"
                  ? "grid size-9 place-items-center rounded-lg bg-destructive/10 text-destructive"
                  : "grid size-9 place-items-center rounded-lg bg-primary/10 text-primary"
              }
            >
              <item.icon className="size-4.5" />
            </span>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold tracking-tight">
              {item.value}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">{item.delta}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
