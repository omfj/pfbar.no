import "dotenv/config";
import { type Config, defineConfig } from "drizzle-kit";

const commonConfig: Partial<Config> = {
  strict: true,
  out: "./drizzle/migrations",
  schema: "./src/db/schemas",
};

const localConfig = defineConfig({
  ...commonConfig,
  driver: "libsql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});

const prodConfig = defineConfig({
  ...commonConfig,
  driver: "turso",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
    authToken: process.env.DATABASE_AUTH_TOKEN,
  },
});

export default process.env.NODE_ENV === "production" ? prodConfig : localConfig;
