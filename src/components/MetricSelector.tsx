type MetricOption = {
  id: string;
  label: string;
  category: string;
};

type MetricSelectorProps = {
  metrics: MetricOption[];
  selectedMetricId: string;
  onMetricChange: (metricId: string) => void;
  states: string[];
  selectedStates: string[];
  onToggleState: (stateName: string) => void;
};

export default function MetricSelector({
  metrics,
  selectedMetricId,
  onMetricChange,
  states,
  selectedStates,
  onToggleState
}: MetricSelectorProps) {
  return (
    <div className="controls-layout">
      <div>
        <label htmlFor="metric-select">Metrica principal</label>
        <select
          id="metric-select"
          value={selectedMetricId}
          onChange={(event) => onMetricChange(event.target.value)}
        >
          {metrics.map((metric) => (
            <option key={metric.id} value={metric.id}>
              {metric.category} · {metric.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <span className="filter-label">Estados a comparar</span>
        <div className="state-chip-group">
          {states.map((state) => {
            const isSelected = selectedStates.includes(state);

            return (
              <button
                className={isSelected ? "state-chip active" : "state-chip"}
                key={state}
                onClick={() => onToggleState(state)}
                type="button"
              >
                {state}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
