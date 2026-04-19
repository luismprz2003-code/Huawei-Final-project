# Estandar de datos territoriales

## Objetivo

Definir un esquema consistente para comparar estados de Mexico en dashboards, manteniendo separadas tres piezas:

1. `Catalogo de variables`: define que significa cada indicador.
2. `Maestro de estados`: define nombres canonicos y metadatos territoriales.
3. `Datasets procesados`: contienen observaciones listas para analisis.

## Diseno recomendado

### 1. Catalogo de variables

Archivo recomendado: `data/catalogs/variables.catalog.json`

Cada variable tiene:

- `variable_id`: nombre canonico en `snake_case`
- `categoria_id`: una de `infraestructura_digital`, `cobertura_red`, `industria`, `contexto_territorial`
- `nombre`
- `descripcion`
- `unidad_base`
- `tipo_valor`
- `agregacion_default`
- `fuente_sugerida`
- `sinonimos`

Esto evita ambiguedad cuando una fuente usa nombres distintos para el mismo indicador.

### 2. Maestro de estados

Archivo recomendado: `data/catalogs/states.master.json`

Cada estado tiene:

- `state_code`: clave corta canonica
- `estado`: nombre oficial normalizado
- `aliases`: variantes comunes para ingestion
- `region`
- `capital`

Esto permite que los dashboards trabajen siempre con el mismo nombre, aunque la fuente original venga con acentos, abreviaturas o variantes.

### 3. Dataset procesado estandar

Archivo recomendado: `data/processed/territorial_observations.long.json`

Formato largo, un registro por observacion:

- `estado`
- `categoria`
- `variable`
- `valor`
- `anio`
- `fuente`
- `unidad`

Campos opcionales utiles:

- `state_code`
- `cobertura_geografica`
- `notas`
- `updated_at`

Este formato es el mas flexible para:

- comparar categorias distintas
- filtrar por anio
- mostrar trazabilidad de fuente
- pivotear despues a formato ancho para dashboards especificos

## Formato derivado para UI

Archivo recomendado: `data/processed/territorial_dashboard.wide.json`

Este formato es una vista derivada del dataset largo. Agrupa un registro por estado y deja las variables como columnas dentro de `metrics`. Es mas comodo para componentes de KPIs o graficas que esperan un solo objeto por estado.

## Convencion de nombres

### Categorias

- `infraestructura_digital`
- `cobertura_red`
- `industria`
- `contexto_territorial`

### Variables sugeridas

- `indice_conectividad_digital`
- `hogares_banda_ancha_fija_pct`
- `cobertura_5g_pct`
- `cobertura_4g_pct`
- `penetracion_movil_pct`
- `actividad_industrial_indice`
- `empleo_industrial_pct`
- `exportaciones_industriales_usd_millones`
- `inversion_extranjera_industria_usd_millones`
- `poblacion_total`
- `densidad_poblacional`
- `edad_mediana`
- `urbanizacion_pct`
- `escolaridad_promedio_anios`

## Regla practica

- El `catalogo` define el vocabulario.
- El `maestro de estados` define las entidades comparables.
- El `dataset largo` es la fuente analitica principal.
- El `dataset ancho` se genera para consumo rapido en UI.
