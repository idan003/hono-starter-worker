import { InferInsertModel, InferSelectModel, sql } from "drizzle-orm";

import {
  integer,
  sqliteTable,
  text,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";

export const users = sqliteTable(
  "users",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    uuid: text("uuid").unique(),
    email: text("email").unique(),
    token: text("token"),
    role: text("role", {
      enum: ["user", "broker", "affiliate", "admin"],
    })
      .notNull()
      .default("user"),
    createAt: text("create_at").default(sql`CURRENT_DATE`),
  },
  (table) => {
    return {
      uuidIdx: uniqueIndex("uuId_idx").on(table.uuid),
      emailIdx: uniqueIndex("email_idx").on(table.email),
    };
  }
);

export type User = InferSelectModel<typeof users>;
export type NewUser = InferInsertModel<typeof users>;
