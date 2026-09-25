// import { Pool, QueryResultRow } from "pg";

// export const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   max: 20,
//   idleTimeoutMillis: 30000,
//   connectionTimeoutMillis: 5000,
// });

// pool.on("error", (err) => {
//   console.error("Unexpected PostgreSQL pool error:", err);
// });

// export type QueryParams = unknown[];

// export async function query<T extends QueryResultRow = QueryResultRow>(
//   text: string,
//   params: QueryParams = []
// ): Promise<T[]> {
//   const result = await pool.query<T>(text, params);
//   return result.rows;
// }

// export async function queryOne<T extends QueryResultRow = QueryResultRow>(
//   text: string,
//   params: QueryParams = []
// ): Promise<T | null> {
//   const result = await pool.query<T>(text, params);
//   return result.rows[0] ?? null;
// }

import { Pool } from "pg";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is not configured");
}

export const pool = new Pool({
  connectionString: databaseUrl,
  max: 20,
  idleTimeoutMillis: 30_000,
  connectionTimeoutMillis: 5_000,
});

pool.on("error", (error) => {
  console.error("Unexpected PostgreSQL pool error:", error);
});