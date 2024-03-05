import { createBlogPost, getAllBlogs, getBlogById, updateBlogById } from "../controllers/blogController";
import { routeAuthenticator } from "../middlewares/authMiddleware";
import { ContextVariables, Environmentvaraibles } from "../utils/types";
import { Hono } from "hono";

export const blogRouter = new Hono<{
    Bindings: Environmentvaraibles,
    Variables: ContextVariables,
}>();


blogRouter.get('/bulk', getAllBlogs);

blogRouter
        .get('/:id', routeAuthenticator, getBlogById)
        .put(routeAuthenticator, updateBlogById);

blogRouter.post('/', routeAuthenticator, createBlogPost);