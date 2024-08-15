import { ZodError, ZodIssue } from "zod";
import { sign } from "hono/jwt";

const formatZodIssue = (issue: ZodIssue): string => {
  const { path, message } = issue;
  const pathString = path.join(".");

  return `${pathString}: ${message}`;
};

// Format the Zod error message with only the current error
export function formatZodError(error: ZodError) {
  const { issues } = error;

  if (issues.length) {
    const currentIssue = issues[0];

    return formatZodIssue(currentIssue!);
  }

  return "error is undefined";
}
// Format the date
export function formatDate(date: Date | string | number) {
  try {
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      return "error";
    }

    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(parsedDate);
  } catch (error) {
    console.error("Error formatting date:", error);
  }
}

// Get the last hours
export function getLastHours(hour: number) {
  // Get the current timestamp
  const now = new Date().getTime();
  // Subtract one hour from the current timestamp
  const oneHourAgoTimestamp = now - 1000 * 60 * 60;

  return oneHourAgoTimestamp;
}

// Get the current timestamp
export function getCurrentTimestamp(): number {
  return Math.floor(Date.now() / 1000);
}

// Function to generate and store JWT token
export function generateAndStoreToken(
  walletId: string,
  uuid: string,
  secretJWT: string
): Promise<string> {
  const token = sign(
    {
      walletId: walletId.toLocaleLowerCase(),
      uuid: uuid,
      exp: Math.floor(Date.now() / 1000) + 60 * 90,
    },
    secretJWT
  );

  return token;
}
