import { HonoApp } from "../../types";
import {
  updateDeviceIdSchema,
  userAuthSchema,
} from "../../db/validations/users";
import { userAuthService, userUpdateDevice } from "./users.service";
import { validator } from "hono/validator";
import { formatZodError } from "../../middlewares/common/utils";

export default function (app: HonoApp) {
  app.post(
    "/users/auth",
    validator("json", (value, ctx) => {
      const parsed = userAuthSchema.safeParse(value);
      if (!parsed.success)
        throw Error(formatZodError(parsed.error), { cause: 400 });
      return parsed.data;
    }),
    async (ctx) => {
      const { walletId } = ctx.req.valid("json");

      try {
        return ctx.json(await userAuthService(walletId, ctx.env.mySecretKey));
      } catch (e: any) {
        throw Error(e.message, { cause: 500 });
      }
    }
  );
}
