import { Hono } from "hono";

export type SearchParams = Record<string, string | string[] | undefined>;

type Bindings = {
  mySecretKey: string;
  DB: D1Database;
};

type Variables = {
  user?: {
    identifier: string;
    walletId: string;
    uuid: string;
    role?: string;
  };
};

export class HonoApp extends Hono<{
  SearchParams: SearchParams;
  Variables: Variables;
  Bindings: Bindings;
}> {}
