import { z } from "zod";

export const AuthSchema = z.object({
  accessKeyId: z.string().min(10),
  secretAccessKey: z.string().min(20),
  "save-credential-checkbox": z.coerce.boolean().optional(),
});

export const CreateTemplateSchema = z.object({
  templateName: z.string().min(5),
  templateText: z.string().min(5),
  tempalteHtml: z.string().min(10),
});
