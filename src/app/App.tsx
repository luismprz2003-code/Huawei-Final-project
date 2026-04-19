import { useEffect, useMemo, useState } from "react";
import DashboardHeader from "../components/DashboardHeader";
import InsightPanel from "../components/InsightPanel";
import KPIGrid from "../components/KPIGrid";
import MetricSelector from "../components/MetricSelector";
import ComparisonBarChart from "../components/charts/ComparisonBarChart";
import CorrelationScatter from "../components/charts/CorrelationScatter";
import { loadDataset } from "../data/loadDataset";
import type { DashboardDataset, StateMetricRecord } from "../types/dataset";
import { buildInsights } from "../utils/insights";
import { getMetricDefinition, getMetricOptions } from "../utils/metrics";

const DEFAULT_STATES = ["Nuevo Leon", "Jalisco", "Ciudad de Mexico", "Queretaro"];

export default function App() {
  const [dataset, setDataset] = useState<DashboardDataset | null>(null);
  const [selectedMetricId, setSelectedMetricId] = useState("digital_connectivity");
  const [selectedStates, setSelectedStates] = useState<string[]>(DEFAULT_STATES);

  useEffect(() => {
    loadDataset().then(setDataset);
  }, []);

  const metricOptions = useMemo(
    () => (dataset ? getMetricOptions(dataset.metricCatalog) : []),
    [dataset]
  );

  const selectedMetric = useMemo(
    () => (dataset ? getMetricDefinition(dataset.metricCatalog, selectedMetricId) : null),
    [dataset, selectedMetricId]
  );

  const filteredRecords = useMemo(() => {
    if (!dataset) {
      return [];
    }

    return dataset.records.filter((record) => selectedStates.includes(record.state));
  }, [dataset, selectedStates]);

  const topStates = useMemo(() => {
    return [...filteredRecords]
      .sort((left, right) => right.metrics[selectedMetricId] - left.metrics[selectedMetricId])
      .slice(0, 4);
  }, [filteredRecords, selectedMetricId]);

  const insights = useMemo(() => {
    if (!dataset || !selectedMetric) {
      return [];
    }

    return buildInsights(dataset.records, selectedMetric);
  }, [dataset, selectedMetric]);

  const scatterData = useMemo(() => {
    return filteredRecords.map((record) => ({
      state: record.state,
      x: record.metrics.digital_connectivity,
      y: record.metrics.industrial_activity,
      z: record.metrics.population_millions
    }));
  }, [filteredRecords]);

  const toggleState = (stateName: string) => {
    setSelectedStates((currentStates) => {
      if (currentStates.includes(stateName)) {
        return currentStates.filter((item) => item !== stateName);
      }

      return [...currentStates, stateName];
    });
  };

  if (!dataset || !selectedMetric) {
    return <div className="app-shell loading">Cargando dashboard...</div>;
  }

  return (
    <div className="app-shell">
      <DashboardHeader
        title="Huawei Territorial Intelligence"
        subtitle="MVP local para comparar capacidades digitales, industria y contexto territorial en Mexico."
      />

      <section className="panel controls-panel">
        <MetricSelector
          metrics={metricOptions}
          selectedMetricId={selectedMetricId}
          onMetricChange={setSelectedMetricId}
          states={dataset.records.map((record) => record.state)}
          selectedStates={selectedStates}
          onToggleState={toggleState}
        />
      </section>

      <section className="panel">
        <KPIGrid metric={selectedMetric} records={topStates} />
      </section>

      <section className="grid-layout">
        <div className="panel">
          <ComparisonBarChart records={filteredRecords} metric={selectedMetric} />
        </div>

        <div className="panel">
          <CorrelationScatter data={scatterData} />
        </div>
      </section>

      <section className="panel">
        <InsightPanel insights={insights} />
      </section>
    </div>
  );
}
