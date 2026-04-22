import React from "react";
import {
  Card,
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

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

export const ChartView = () => {
  const chartConfig = {
    desktop: {
      label: "Berat (kg)",
      color: "#2563eb",
    },
    mobile: {
      label: "Tinggi (cm)",
      color: "#2EF527",
    },
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Grafik Pertumbuhan Balita</CardTitle>
          <CardDescription>Lihat grafik pertumbuhan --name--</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <LineChart accessibilityLayer data={chartData}>
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
                dataKey={`desktop`}
                type={`bump`}
                stroke="var(--color-desktop)"
                strokeWidth={2}
                dot={true}
              />
              <Line
                dataKey={`mobile`}
                type={`bump`}
                stroke="var(--color-mobile)"
                strokeWidth={2}
                dot={true}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};
