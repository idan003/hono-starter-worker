import { StatusCode } from "hono/utils/http-status";

export const UNAUTHORIZED_EXCEPTION = {
  code: "UNAUTHORIZED",
  message: "user is not authorized",
  statusCode: 401 as StatusCode,
};

export const NOACTIVE_EXCEPTION = {
  code: "UNAUTHORIZED",
  message: "key is not active",
  statusCode: 401 as StatusCode,
};

export const WELCOME_EXCEPTION = {
  code: "SUCCESS",
  message: "Welcome to floorsee API",
  statusCode: 200 as StatusCode,
};

export const USERNOTEXIST_EXCEPTION = {
  code: "FAILED",
  message: "user is not exist, please register",
  statusCode: 400 as StatusCode,
};

export const USEREXIST_EXCEPTION = {
  code: "FAILED",
  message: "user exist, please login",
  statusCode: 400 as StatusCode,
};

export const WALLETEXIST_EXCEPTION = {
  code: "FAILED",
  message: "wallet is already exist",
  statusCode: 500 as StatusCode,
};

export const FORBIDDEN_EXCEPTION = {
  code: "FORBIDDEN",
  message: "Forbidden: You can only delete your own data",
  statusCode: 403 as StatusCode,
};
