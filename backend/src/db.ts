import { Context } from "hono";
import { Environmentvaraibles } from "./utils/types";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

export const connectDatabase = (c: Context<{Bindings: Environmentvaraibles}>) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    return prisma;
}