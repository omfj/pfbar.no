import { getDbClient } from "./pg";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schemas";

const client = getDbClient();

export const db = drizzle(client, {
  schema,
});
