import { z } from "zod";

export const SettingsSchema = z.object({
    username: z.string()
});