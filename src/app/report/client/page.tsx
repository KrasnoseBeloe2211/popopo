"use client";

import { useEffect } from "react";
import { useReportStore } from "@/entities/report/model/reportStore";
import { Card, CardContent, Typography } from "@mui/material";

export default function ClientReportPage() {
  const { summary, fetchReport } = useReportStore();

  useEffect(() => {
    fetchReport();
  }, []);

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">Ваш результат</Typography>
        <Typography>{summary}</Typography>
      </CardContent>
    </Card>
  );
}