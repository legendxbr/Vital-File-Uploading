import { z } from "zod";

export const AuthSchema = z.object({
    email: z.string().email(),
    password: z.string().min(4).regex(/^[\x00-\xFF]*$/)
});