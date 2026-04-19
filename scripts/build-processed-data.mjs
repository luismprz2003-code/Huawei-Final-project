import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

const rawFile = path.join(projectRoot, "data", "raw", "states.metrics.source.json");
const outputDir = path.join(projectRoot, "data", "processed");
const outputFile = path.join(outputDir, "states.metrics.json");

async function main() {
  try {
    const rawContent = await readFile(rawFile, "utf8");
    const payload = JSON.parse(rawContent);

    await mkdir(outputDir, { recursive: true });
    await writeFile(outputFile, JSON.stringify(payload, null, 2));

    console.log(`Dataset procesado generado en ${outputFile}`);
  } catch (error) {
    if (error instanceof Error) {
      console.error(`No fue posible generar el dataset: ${error.message}`);
      process.exitCode = 1;
      return;
    }

    console.error("Fallo desconocido al generar datos procesados.");
    process.exitCode = 1;
  }
}

main();
