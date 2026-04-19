import type { DashboardDataset } from "../types/dataset";

export async function loadDataset(): Promise<DashboardDataset> {
  const response = await fetch("/data/states.metrics.json");

  if (!response.ok) {
    throw new Error("No se pudo cargar el dataset procesado.");
  }

  return response.json();
}
