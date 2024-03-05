import { Context } from "hono";
import { verify } from "hono/jwt";

export const routeAuthenticator = async (c: Context, next: () => void) => {
    const authHeader = c.req.header('Authorisation') || '';
    console.info(authHeader);
    const token = authHeader.split(' ')[1];
    if(!token) {
        return c.json({
            error: {
                message: 'Forbidden',
            },
        }, 401)
    }
    console.info(token);
    const user = await verify(token, c.env.JWT_SECRET);
    if(user) {
        c.set('userId', user.id);
        await next();
    } else {
        return c.json({
            error: {
                msg: 'Forbidden',
            },
        }, 401)
    }
}