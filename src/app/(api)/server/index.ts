import { publicProcedure, router } from "./trpc";
import { z } from "zod";
import { usersRouter } from "@/lib/trpc/routes/users";
import { filesRouter } from "@/lib/trpc/routes/files";

export const appRouter = router({
    users: usersRouter,
    files: filesRouter
});

export type AppRouter = typeof appRouter;