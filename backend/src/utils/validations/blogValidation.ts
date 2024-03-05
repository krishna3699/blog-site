import { z } from 'zod';

export const createBlogInput = z.object({
    title: z.string(),
    content: z.string(),
});