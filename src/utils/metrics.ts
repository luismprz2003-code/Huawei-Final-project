import type { MetricDefinition } from "../types/dataset";

export function getMetricOptions(metricCatalog: MetricDefinition[]) {
  return metricCatalog.map((metric) => ({
    id: metric.id,
    label: metric.label,
    category: metric.category
  }));
}

export function getMetricDefinition(
  metricCatalog: MetricDefinition[],
  metricId: string
): MetricDefinition {
  const metric = metricCatalog.find((item) => item.id === metricId);

  if (!metric) {
    throw new Error(`La metrica ${metricId} no existe en el catalogo.`);
  }

  return metric;
}
