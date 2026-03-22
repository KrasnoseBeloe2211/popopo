"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useReportStore } from "@/entities/report/model/reportStore";
import { toChartData } from "@/entities/report/lib/transform";
import { BarChartBlock } from "@/shared/ui/charts/BarChart";
import { RadarChartBlock } from "@/shared/ui/charts/RadarChart";
import { Card, CardContent, Typography, Box, Grid } from "@mui/material";

export default function ClientReportPage() {
  const { sessionId } = useParams();
  const { metrics, summary, fetchReport } = useReportStore();

  useEffect(() => {
    if (sessionId) {
      fetchReport(sessionId as string, 'pdf', 'client');
    }
  }, [sessionId, fetchReport]);

  const data = toChartData(metrics);

  return (
    <Box className="report-page">
      <Box className="report-header">
        <Typography variant="h4" className="report-title">
          Результаты тестирования
        </Typography>
        <Typography variant="body1" className="report-subtitle">
          Ваш персональный отчёт по итогам опросника
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card className="report-card">
            <CardContent>
              <Typography variant="h6" className="card-title">
                Диаграмма показателей
              </Typography>
              <RadarChartBlock data={data} />
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Card className="report-card">
            <CardContent>
              <Typography variant="h6" className="card-title">
                Сравнение метрик
              </Typography>
              <BarChartBlock data={data} />
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Card className="report-card">
            <CardContent>
              <Typography variant="h6" className="card-title">
                Детальные показатели
              </Typography>
              <Box className="metrics-grid">
                {data.map((item) => (
                  <Box key={item.name} className="metric-item">
                    <Typography className="metric-name">{item.name}</Typography>
                    <Box className="metric-bar-container">
                      <Box
                        className="metric-bar"
                        style={{ width: `${item.value}%` }}
                      />
                    </Box>
                    <Typography className="metric-value">{item.value}%</Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Card className="report-card summary-card">
            <CardContent>
              <Typography variant="h6" className="card-title">
                Заключение
              </Typography>
              <Typography className="summary-text">
                {summary}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
