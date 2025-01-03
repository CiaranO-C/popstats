import { BarChart } from "@mantine/charts";
import { dayMap, generateSeries, isKeyOfDayMap, monthMap } from "./utils";
import { Button, useMantineTheme } from "@mantine/core";
import DateTooltip from "./DateTooltip";
import { useToggle } from "@mantine/hooks";

interface AverageDailyType {
  average: number;
  date: keyof typeof dayMap;
}

function sortDaily(daily: AverageDailyType[]) {
  if (daily[0].date === "0") {
    const sunday = daily.shift();
    if (sunday) {
      daily.push(sunday);
    }
  }
  return daily;
}

function CustomBarChart({ data }) {
  const [daily, toggle] = useToggle();
  const currentData = daily ? sortDaily(data.daily) : data.monthly;
  const colors = useMantineTheme().colors;

  return (
    <>
      <Button onClick={() => toggle()}>toggle</Button>
      <BarChart
        h={300}
        data={currentData}
        dataKey="date"
        series={generateSeries(currentData, ["date"], colors)}
        barProps={{ radius: 10, maxBarSize: 80, isAnimationActive: true }}
        xAxisProps={{
          tickFormatter: (tick) => {
            if (daily && isKeyOfDayMap(tick)) return dayMap[tick];

            const month = new Date(new Date().setMonth(tick))
              .toString()
              .split(" ")[1];
            return month;
          },
        }}
        tooltipProps={{
          content: ({ label, payload }) => (
            <DateTooltip
              label={label}
              payload={payload}
              dateType={daily ? "daily" : "monthly"}
            />
          ),
        }}
      />
    </>
  );
}

export default CustomBarChart;
