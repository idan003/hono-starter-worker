import { Context, Next } from "hono";

// Error Handler
export const errorHandler = (c: Context) => {
  return c.json(c.error?.message, c.error?.cause || 500);
};

// Response Handler
export const responseHandler =  async (c: Context, next: Next) => {
  await next()

  const response = c.res
  if (response && response.headers.get('Content-Type')?.includes('application/json')) {
    const originalBody = await response.json()
    const newBody = {
      success: c.error ? false : true,
      message: c.error ? c.error.message : originalBody,
      requestId: c.get('requestId')
    }

    c.res = new Response(JSON.stringify(newBody), {
      status: response.status,
      headers: response.headers
    })
  }
}

// Not Found Handler
export const notFound = (c: Context) => {
  return c.json({
    message: `Not Found - [${c.req.method}] ${c.req.url}`,
  });
};
