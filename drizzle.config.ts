import "dotenv/config";
import { type Config, defineConfig } from "drizzle-kit";

export default defineConfig({
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
  out: "./drizzle/migrations",
  schema: "./src/db/schemas",
});
