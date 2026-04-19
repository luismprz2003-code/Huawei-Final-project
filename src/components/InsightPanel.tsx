type InsightPanelProps = {
  insights: string[];
};

export default function InsightPanel({ insights }: InsightPanelProps) {
  return (
    <div>
      <div className="section-heading">
        <h2>Insights automatizados</h2>
        <p>Lecturas iniciales generadas a partir de las variables cargadas en el MVP.</p>
      </div>

      <div className="insight-list">
        {insights.map((insight) => (
          <article className="insight-card" key={insight}>
            <p>{insight}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
