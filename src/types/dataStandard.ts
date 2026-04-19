export type CategoryId =
  | "infraestructura_digital"
  | "cobertura_red"
  | "industria"
  | "contexto_territorial";

export type VariableCatalogEntry = {
  variable_id: string;
  categoria_id: CategoryId;
  nombre: string;
  descripcion: string;
  unidad_base: string;
  tipo_valor: "number" | "integer" | "percentage" | "currency";
  agregacion_default: "avg" | "sum" | "latest";
  fuente_sugerida: string;
  sinonimos: string[];
};

export type StateMasterEntry = {
  state_code: string;
  estado: string;
  aliases: string[];
  region: string;
  capital: string;
};

export type TerritorialObservation = {
  state_code?: string;
  estado: string;
  categoria: CategoryId;
  variable: string;
  valor: number;
  anio: number;
  fuente: string;
  unidad: string;
};

export type TerritorialWideRecord = {
  state_code?: string;
  estado: string;
  region?: string;
  anio: number;
  metrics: Record<string, number>;
};
