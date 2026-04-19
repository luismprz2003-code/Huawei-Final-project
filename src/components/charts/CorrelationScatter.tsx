import {
  CartesianGrid,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis
} from "recharts";

type ScatterDatum = {
  state: string;
  x: number;
  y: number;
  z: number;
};

type CorrelationScatterProps = {
  data: ScatterDatum[];
};

export default function CorrelationScatter({ data }: CorrelationScatterProps) {
  return (
    <div>
      <div className="section-heading">
        <h2>Relacion digital-industrial</h2>
        <p>Explora la relacion entre conectividad, actividad industrial y tamano poblacional.</p>
      </div>

      <div className="chart-frame">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart>
            <CartesianGrid />
            <XAxis
              type="number"
              dataKey="x"
              name="Conectividad digital"
              unit="%"
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              type="number"
              dataKey="y"
              name="Actividad industrial"
              unit=" pts"
              tickLine={false}
              axisLine={false}
            />
            <ZAxis type="number" dataKey="z" range={[80, 500]} name="Poblacion" />
            <Tooltip cursor={{ strokeDasharray: "3 3" }} />
            <Scatter data={data} fill="#0f8b8d" />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
