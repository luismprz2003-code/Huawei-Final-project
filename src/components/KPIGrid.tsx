import type { MetricDefinition, StateMetricRecord } from "../types/dataset";

type KPIGridProps = {
  metric: MetricDefinition;
  records: StateMetricRecord[];
};

export default function KPIGrid({ metric, records }: KPIGridProps) {
  return (
    <div>
      <div className="section-heading">
        <h2>Estados lideres en {metric.label}</h2>
        <p>Comparacion rapida de los estados con mejor desempeno en la metrica seleccionada.</p>
      </div>

      <div className="kpi-grid">
        {records.map((record) => (
          <article className="kpi-card" key={record.state}>
            <span>{record.region}</span>
            <strong>{record.state}</strong>
            <p>
              {record.metrics[metric.id].toFixed(1)} {metric.unit}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
