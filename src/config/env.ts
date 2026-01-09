import { z } from "zod";

const envSchema = z.object({
  VITE_API_BASE_URL: z.url(),
  VITE_PEXELS_API: z.string().min(1),
});

const env = envSchema.safeParse(import.meta.env);

if (!env.success) {
  console.error("Invalid environment variables:", z.treeifyError(env.error));
  throw new Error("Invalid environment variables");
}

export const ENV = env.data;
