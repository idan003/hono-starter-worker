import { z } from "zod";

// Users Schema Validation Auth
export const userAuthSchema = z.object({
  email: z
    .string().email()
});

export const userRegisterSchema = z.object({
  email: z.string().email(),
  role: z.string().optional(),
});

export const UserHeaderSchema = z.object({
  identifier: z.string(),
  email: z.string(),
  uuid: z.string().uuid(),
  role: z.enum(["admin", "user", "guest", "undefined"]).default("user"),
});

/* ---------------------------------- Types --------------------------------- */
export type UserAuth = z.infer<typeof userAuthSchema>;
export type userWallet = UserAuth["email"];
export type UserCreate = z.infer<typeof userRegisterSchema>;
export type UserHeader = z.infer<typeof UserHeaderSchema>;
