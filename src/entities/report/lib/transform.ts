export const toChartData = (metrics: Record<string, number>) => {
  return Object.entries(metrics).map(([key, value]) => ({
    name: key,
    value,
  }));
};