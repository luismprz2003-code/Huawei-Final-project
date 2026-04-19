const STATE_ALIASES: Record<string, string> = {
  aguascalientes: "Aguascalientes",
  chihuahua: "Chihuahua",
  cdmx: "Ciudad de Mexico",
  "ciudad de mexico": "Ciudad de Mexico",
  "ciudad de méxico": "Ciudad de Mexico",
  "distrito federal": "Ciudad de Mexico",
  jalisco: "Jalisco",
  "nuevo leon": "Nuevo Leon",
  "nuevo león": "Nuevo Leon",
  "n.l.": "Nuevo Leon",
  queretaro: "Queretaro",
  "querétaro": "Queretaro",
  "queretaro de arteaga": "Queretaro",
  yucatan: "Yucatan",
  "yucatán": "Yucatan"
};

const VARIABLE_ALIASES: Record<string, string> = {
  digital_connectivity: "indice_conectividad_digital",
  "conectividad digital": "indice_conectividad_digital",
  "indice de conectividad": "indice_conectividad_digital",
  mobile_coverage_5g: "cobertura_5g_pct",
  "cobertura 5g": "cobertura_5g_pct",
  "5g coverage": "cobertura_5g_pct",
  industrial_activity: "actividad_industrial_indice",
  "actividad industrial": "actividad_industrial_indice",
  industrial_exports: "exportaciones_industriales_usd_millones",
  "exportaciones industriales": "exportaciones_industriales_usd_millones",
  population: "poblacion_total",
  "poblacion total": "poblacion_total",
  urbanization: "urbanizacion_pct",
  "urbanizacion rate": "urbanizacion_pct",
  urbanizacion: "urbanizacion_pct"
};

export function slugifyLabel(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

export function normalizeStateName(rawStateName: string): string {
  const normalizedKey = rawStateName
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

  return STATE_ALIASES[normalizedKey] ?? toTitleCase(normalizedKey);
}

export function normalizeVariableName(rawVariableName: string): string {
  const normalizedKey = rawVariableName
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

  return VARIABLE_ALIASES[normalizedKey] ?? slugifyLabel(normalizedKey);
}

function toTitleCase(value: string): string {
  return value
    .split(" ")
    .filter(Boolean)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(" ");
}
