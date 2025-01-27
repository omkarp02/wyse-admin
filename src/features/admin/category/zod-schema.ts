import { z } from "zod";


export const categorySchema = z.object({
  description: z.string().min(1, "Description is required"), // Ensure it's a non-empty string
  icon: z.string().url("Icon must be a valid URL"), // Ensure it's a valid URL
  imgLink: z.string().url("Image link must be a valid URL"), // Ensure it's a valid URL
  isActive: z.boolean(), // Boolean value
  name: z.string().min(1, "Name is required"), // Ensure it's a non-empty string
  slug: z.string().min(1, "Slug is required"), // Ensure it's a non-empty string
});

export type ICategoryFormFields = z.infer<typeof categorySchema>; 
