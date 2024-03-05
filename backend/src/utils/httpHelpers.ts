import { Context } from "hono"
import { StatusCode } from "hono/utils/http-status";

export const respondSuccess = <T>(c: Context, data: T, status: StatusCode)  => {
    return c.json({ data }, status);
}

// TODO: create a route for failure as well with error message and optional status