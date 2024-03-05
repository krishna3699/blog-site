import { Context } from "hono"
import { connectDatabase } from "../db";
import { createBlogInput } from "../utils/validations/blogValidation";


export const getBlogById = async (c: Context) => {
    try {
		const prisma = connectDatabase(c);
		const blogId = c.req.param('id');
		const blog = await prisma.blog.findFirst({
			where: {
				id: blogId,
			}
		});
		return c.json({
			data: {
				blog
			}
		}, 200);
    } catch(err) {
        return c.json({
            error: {
                message: 'Cannot Get the blog with specified id',
            }
        }, 411);
    }
}

export const createBlogPost = async (c: Context) => {
	const userId = c.get('userId');
	const prisma = connectDatabase(c);

	const body = await c.req.json();
	const { success } = createBlogInput.safeParse(body);
	if(!success) return c.json({ error: { message: 'Inavlid Parameters' }}, 411);
	const post = await prisma.blog.create({
		data: {
			title: body.title,
			content: body.content,
			authorId: userId
		}
	});
	return c.json({
		id: post.id
	});
}

export const updateBlogById = async (c: Context) => {
	const userId = c.get('userId');
	const prisma = connectDatabase(c);

	const body = await c.req.json();
	prisma.blog.update({
		where: {
			id: body.id,
			authorId: userId
		},
		data: {
			title: body.title,
			content: body.content
		}
	});
	return c.text('updated post');
};

export const getAllBlogs = async (c: Context) => {
	const prisma = connectDatabase(c);
	const posts = await prisma.blog.findMany({});
	return c.json(posts);
};