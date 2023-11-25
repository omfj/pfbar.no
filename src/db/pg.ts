import postgres from "postgres";

let clientInstance: postgres.Sql<{}> | null = null;

export const getDbClient = () => {
  if (!clientInstance) {
    clientInstance = postgres(process.env.DATABASE_URL!);
  }
  return clientInstance;
};
