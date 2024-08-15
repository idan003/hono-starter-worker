import { HonoApp } from "./types";
import { prettyJSON } from "hono/pretty-json";
import { cors } from "hono/cors";
import database from "./db";
import { logger } from "hono/logger";
import router from "./routes";
import authMiddleware from "./middlewares/auth.middleware";
import { requestId } from "hono/request-id";
import { timeout } from "hono/timeout";

import { Env } from "hono";
import {
  errorHandler,
  notFound,
  responseHandler,
} from "./middlewares/error.middleware";

const app = new HonoApp();

// DB connection
database(app);

app.use("*", logger(), prettyJSON(), requestId());
app.use(
  "*",
  cors({
    origin: "*",
    allowMethods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use("*", responseHandler);

app.use("/v1/*", timeout(30000));
// Register the exception middleware
app.use("/v1/*", authMiddleware);

// Register all the routes
router(app);

// Error Handler
app.onError((err, c) => {
  const error = errorHandler(c);
  return error;
});

// Not Found Handler
app.notFound((c) => {
  const error = notFound(c);
  return error;
});

export default {
  port: 8787,
  fetch: app.fetch,
};
