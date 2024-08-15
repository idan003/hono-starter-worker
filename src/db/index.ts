import * as schema from "./schema";
import { HonoApp } from "../types";

import { drizzle } from "drizzle-orm/d1";

let sql: any = null as unknown as any;

export function db() {
  if (sql === null) {
    throw new Error("No database connection established");
  }

  return sql;
}

export default (app: HonoApp) => {
  app.use("*", async (c, next) => {
    try {
      sql = drizzle(c.env.DB, { schema, logger: true });
      await next();
    } catch (error) {
      throw new Error("connection to db failed", {cause: 500});
    }
  });
};
