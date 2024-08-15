import { Context, Next } from "hono";
import { authService } from "../controllers/users/users.service";
import { verify } from "hono/jwt";

const authMiddleware = async (c: Context, next: Next) => {
  let token;

  if (c.req.header("x-apiToken")) {
    try {
      token = c.req.header("x-apiToken");

      if (!token) {
        throw Error("token is missing", { cause: 401 });
      }

      const decodedPayload = await verify(token, c.env.mySecretKey);

      if (!decodedPayload) {
        throw Error("your token is expired", { cause: 401 });
      }

      const user = await authService(token);

      if (!user || user.length === 0) {
        throw Error("Invalid token! You are not authorized!", {
          cause: 401,
        });
      }

      c.set("user", user[0]);

      await next();
    } catch (error) {
      throw Error("Invalid token! You are not authorized!", { cause: 401 });
    }
  } else {
    throw Error(`missing header x-apiToken`, { cause: 401 });
  }
};

export default authMiddleware;
