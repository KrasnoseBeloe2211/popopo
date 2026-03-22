"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useReportStore } from "@/entities/report/model/reportStore";
import { Card, CardContent, Typography } from "@mui/material";

export default function Page() {
  const { sessionId } = useParams();
  const { summary, fetchReport } = useReportStore();

  useEffect(() => {
    if (sessionId) {
      fetchReport(sessionId as string, 'pdf', 'client');
    }
  }, [sessionId, fetchReport]);

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">Ваш результат</Typography>
        <Typography>{summary}</Typography>
      </CardContent>
    </Card>
  );
}