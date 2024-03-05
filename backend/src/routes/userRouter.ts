import { Hono } from "hono";
import { ContextVariables, Environmentvaraibles } from "../utils/types";
import { signIn, signUp } from "../controllers/userController";

export const userRouter = new Hono<{
    Bindings: Environmentvaraibles,
    Variables: ContextVariables,
}>();

userRouter.post('/signup', signUp);
  
userRouter.post('/signin', signIn);
