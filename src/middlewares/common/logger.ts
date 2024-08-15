import { getCurrentTimestamp } from "./utils";

const log = (level: "error" | "info" | "warn" | "debug") => {
  const service = "prod";

  return (component: string, message: string) => {};
};

export const logger = {
  error: log("error"),
  info: log("info"),
  warn: log("warn"),
  debug: log("debug"),
};
