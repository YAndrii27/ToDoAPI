import path from "path";
import dotenv from "dotenv";
import { cwd } from "process";

export function loadDotenv() {
  dotenv.config({ path: path.join(cwd(), ".env") });
}