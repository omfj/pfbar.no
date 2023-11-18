import "dotenv/config";
import { db } from "@/db/drizzle";
import { migrate } from "drizzle-orm/libsql/migrator";

console.log("🚚 Starting migrations...");

migrate(db, {
  migrationsFolder: "./drizzle/migrations",
})
  .then(() => {
    console.log("✅ Migrations complete.");
    process.exit(0);
  })
  .catch((e) => {
    console.error("❌ Migration failed.");
    console.error(e);
    process.exit(1);
  });
