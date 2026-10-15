import { existsSync } from "node:fs";
import path from "node:path";

/** True when `public/<name>` exists, so optional assets (headshot, resume) degrade gracefully. */
export function hasPublicFile(name: string) {
  return existsSync(path.join(process.cwd(), "public", name));
}
