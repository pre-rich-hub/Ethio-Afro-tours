import pg from "pg";
const { Client } = pg;
import dotenv from "dotenv";

dotenv.config();

const pwd = process.env.NEON_PASSWORD || (process.env.DIRECT_URL ? new URL(process.env.DIRECT_URL).password : "");

if (!pwd) {
  console.error("Set NEON_PASSWORD or DIRECT_URL in your environment before running this connectivity helper.");
  process.exit(1);
}

const tests = [
  ["pooled-ipv4", `postgresql://neondb_owner:${pwd}@16.58.187.204:5432/neondb?sslmode=require&channel_binding=require&pgbouncer=true&connection_limit=1`],
  ["direct-ipv4", `postgresql://neondb_owner:${pwd}@16.58.187.204:5432/neondb?sslmode=require`],
  ["pooled-hostname", `postgresql://neondb_owner:${pwd}@ep-dark-waterfall-ay5tms3m-pooler.c-5.us-east-2.aws.neon.tech:5432/neondb?sslmode=require`],
  ["direct-hostname", `postgresql://neondb_owner:${pwd}@ep-dark-waterfall-ay5tms3m.c-5.us-east-2.aws.neon.tech:5432/neondb?sslmode=require`],
];
for (const [name, url] of tests) {
  const c = new Client({ connectionString: url, connectionTimeoutMillis: 10000 });
  try { await c.connect(); const r = await c.query("SELECT 1 ok"); console.log(`OK   ${name} -> ${r.rows[0].ok}`); await c.end(); }
  catch (e) { console.log(`FAIL ${name} -> ${(e.code || "").toString().padEnd(8)} ${String(e.message).split("\n")[0].slice(0,140)}`); }
}
