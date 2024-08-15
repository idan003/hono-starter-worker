import usersController from "./controllers/users/users.controller";
import { HonoApp } from "./types";

//version api
import * as packageJson from "../package.json";

export default function (app: HonoApp) {
  app.get("/", async (ctx) => {
    return ctx.json({
      welcome: "Welcome to API",
      versionApi: packageJson.version,
    });
  });

  usersController(app);
}
