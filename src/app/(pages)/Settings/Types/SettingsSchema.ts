import { z } from "zod";

export const SettingsSchema = z.object({
    username: z.string().regex(/^[a-zA-Z0-9]+$/)
});