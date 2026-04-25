import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "./ui/chart";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { Badge } from "./ui/badge";
import { AlertTriangle } from "lucide-react";

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

export const ChartView = ({ data }) => {
  const chartConfig = {
    bb: {
      label: "Berat (kg)",
      color: "#2563eb",
    },
    tb: {
      label: "Tinggi (cm)",
      color: "#2EF527",
    },
  };

  const isStunting = data.timbang.some(
    (item) => item.status === "Pendek" || item.status === "S.Pendek",
  );

  return (
    <div>
      <Card className="h-full">
        <CardHeader>
          <CardAction>
            {isStunting && (
              <Badge className="bg-red-700 text-red-100">
                <AlertTriangle />
                Perlu Perhatian
              </Badge>
            )}
          </CardAction>
          <CardTitle>Grafik Pertumbuhan Balita</CardTitle>
          <CardDescription>
            <h3 className="text-slate-600">
              Lihat grafik pertumbuhan{" "}
              <span className="uppercase">{data.name}</span>
            </h3>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <LineChart accessibilityLayer data={data.timbang}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey={`month`}
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(val) => val.slice(0, 3)}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={18}
                tickFormatter={(val) => `${val} kg`}
                className="text-xs"
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <ChartLegend content={<ChartLegendContent />} />
              <Line
                dataKey={`bb`}
                type={`bump`}
                stroke="var(--color-bb)"
                strokeWidth={2}
                connectNulls={false}
                dot={true}
              />
              <Line
                dataKey={`tb`}
                type={`bump`}
                stroke="var(--color-tb)"
                strokeWidth={2}
                connectNulls={false}
                dot={true}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};
