import { Hono } from 'hono'
import { sign, verify } from 'hono/jwt'
import { ContextVariables, Environmentvaraibles } from './utils/types';
import { userRouter } from './routes/userRouter';
import { blogRouter } from './routes/blogRouter';

const app = new Hono<{
  Bindings: Environmentvaraibles,
  Variables: ContextVariables,
}>();

app.route('/api/v1/users', userRouter);
app.route('/api/v1/blog', blogRouter)

export default app
