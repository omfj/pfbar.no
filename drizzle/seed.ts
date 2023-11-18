import "dotenv/config";
import { db } from "@/db/drizzle";
import { products } from "@/db/schemas";

async function seed() {
  db.insert(products)
    .values([
      {
        name: "Gin Tonic",
        description: "A classic, refreshing cocktail",
      },
      {
        name: "Mojito",
        description: "A classic, refreshing cocktail",
      },
    ])
    .run();
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
