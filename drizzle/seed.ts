import "dotenv/config";
import { db } from "@/db/drizzle";
import { products } from "@/db/schemas";
import { commonProducts } from "./seed-data/products";

async function seed() {
  await db.insert(products).values(commonProducts);
}

console.log("🌱 Starting seed...");

seed()
  .then(() => {
    console.log("✅ Seed complete!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("🚨 Seed failed!");
    console.error(error);
    process.exit(1);
  });
