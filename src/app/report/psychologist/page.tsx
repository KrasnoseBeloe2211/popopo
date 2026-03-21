"use client";

import { useEffect } from "react";
import { useReportStore } from "@/entities/report/model/reportStore";
import { toChartData } from "@/entities/report/lib/transform";
import { BarChartBlock } from "@/shared/ui/charts/BarChart";
import { Card, CardContent, Typography } from "@mui/material";

export default function PsychologistReportPage() {
  const { metrics, fetchReport } = useReportStore();

  useEffect(() => {
    fetchReport();
  }, []);

  const data = toChartData(metrics);

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">Отчёт для психолога</Typography>

        <BarChartBlock data={data} />
        {data.map((item) => (
          <Typography key={item.name}>
            {item.name}: {item.value}%
          </Typography>
        ))}
      </CardContent>
    </Card>
  );
}