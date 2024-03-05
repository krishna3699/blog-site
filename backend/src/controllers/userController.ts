import { Context } from "hono";
import { connectDatabase } from "../db";
import { sign } from "hono/jwt";
import { signUpInput } from "../utils/validations/userValidation";

export const signUp = async (c: Context) => {
      try {
        const prisma = connectDatabase(c);
        const body = await c.req.json();
        const { success } = signUpInput.safeParse(body);
        if(!success)    return c.json({ error: "Invalid Parameters" }, 411);
        const user = await prisma.user.create({
            data: {
                email: body.email,
                password: body.password
            }
        });
        const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
        return c.json({ data: { jwt } });
      } catch(e) {
          return c.json({ error: "error while signing up" }, 401);
      }
    }

export const signIn = async (c: Context) => {
    try {

        const prisma = connectDatabase(c);
        const body = await c.req.json();
      
        const user = await prisma.user.findUnique({
              where: {
                  email: body.email,
                  password: body.password
              }
          });
      
          if (!user) {
              c.status(403);
              return c.json({ error: "Incorrect Creds" });
          }
      
          const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
          return c.json({ data: { jwt } });
    } catch(err) {
        console.error(err);
        c.status(411)
        return c.json({
            error: 'Error in procesing the request'
        })
    }
}