import { z } from "zod";

export const AuthSchema = z.object({
  accessKeyId: z.string().min(10),
  secretAccessKey: z.string().min(20),
  "save-credential-checkbox": z.boolean().optional(),
});
