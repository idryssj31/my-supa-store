import { z } from "zod";

export const updateProductSchema = z.object({
  slug: z.string().min(1),
  name: z.string().trim().min(2, "Le nom doit contenir au moins 2 caractères."),
  price: z.coerce.number().positive("Le prix doit être positif."),
  description: z
    .string()
    .trim()
    .min(10, "La description doit contenir au moins 10 caractères."),
  specs: z
    .string()
    .trim()
    .min(3, "Les spécifications doivent contenir au moins 3 caractères."),
});

export type UpdateProductInput = z.infer<typeof updateProductSchema>;
