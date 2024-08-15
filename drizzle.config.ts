import type { Config } from "drizzle-kit";

export default {
  breakpoints: true,
  schema: "./src/db/schema/*.ts",
  out: "./src/db/migrations",
  driver: "d1-http",
  dialect: "sqlite",
  dbCredentials: {
    accountId: "{accountId}",
    databaseId: "{databaseId}",
    token: "{token cloudflare}",
  },
} satisfies Config;
