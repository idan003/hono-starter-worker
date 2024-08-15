import { eq, like } from "drizzle-orm";
import { db } from "../../db";
import { NewUser, users } from "../../db/schema/users";
import { UserCreate } from "../../db/validations/users";
import { sign } from "hono/jwt";
import { v4 as uuidv4 } from "uuid";
import { generateAndStoreToken } from "../../middlewares/common/utils";

export const authService = async (token: string) => {
  return await db().select().from(users).where(eq(users.token, token));
};

export const userAuthService = async (
  email: string,
  secretKey: string
): Promise<{}> => {
  const uuidCreate = uuidv4();
  // Check if user exists
  let user = await db()
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (user.length === 0) {
    if (!email) {
      throw Error("Email id is required for registration", { cause: 400 });
    }

    const newUser = await db()
      .insert(users)
      .values({
        email: email,
        token: "",
        uuid: uuidCreate,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();

    user = newUser;
  } else {
    // User exists, update information if provided
    const updateData: Partial<NewUser> = {};

    if (Object.keys(updateData).length > 0) {
      // Fetch updated user data
      user = await db()
        .select()
        .from(users)
        .where(eq(users.uuid, user[0].uuid))
        .limit(1);
    }
  }

  // Generate and store token
  const token = await generateAndStoreToken(email, uuidCreate, secretKey);

  const { token: _, ...userWithoutPassword } = user[0];

  await db().update(users).set({ token }).where(eq(users.uuid, user[0].uuid));

  // Return the token and user info (excluding password)
  return {
    user: userWithoutPassword,
    token,
    isNewUser: user.length === 0, // Indicate if this was a new registration
  };
};
