import { z } from "zod";
import { websiteSchema } from "../../../lib/zod-schema/common";

export const productSchema = z.object({
  detail: z.object({
    description: z.object({
      productDetails: z.string().min(1, "Product details are required"),
      specifications: z.object({
        sleeveLength: z.string().optional(),
        collar: z.string().optional(),
        fit: z.string().optional(),
        patternType: z.string().optional(),
        occasion: z.string().optional(),
        length: z.string().optional(),
        hemline: z.string().optional(),
        placket: z.string().optional(),
        placketLength: z.string().optional(),
        cuff: z.string().optional(),
        transparency: z.string().optional(),
        weavePattern: z.string().optional(),
        mainTrend: z.string().optional(),
        numberOfItems: z.number().optional(),
        packageContains: z.string().optional(),
      }),
    }),
    variations: z.array(
      z.object({
        size: z.string().min(1, "Size is required"),
        price: z.number().min(0, "Price must be positive"),
        discount: z.number().min(0, "Invalid Discount").max(100, "Invalid Discount"),
      })
    ),
    imgLink: z
      .array(
        z.object({
          value: websiteSchema,
        })
      )
      .min(1, "At least one image is required"),
    batchId: z.string(),
  }),
  productList: z.object({
    name: z.string().min(1, "Product name is required"),
    color: z.string().min(1, "Color is required"),
    price: z.number().min(0, "Price must be positive"),
    imgLink: z.string().url("Invalid image URL"),
    stock: z.number().min(0, "Stock must be non-negative"),
    discount: z.number(),
    category: z.string().min(1, "Category is required"),
    batchId: z.string(),
    gender: z.string().min(1, "Gender is required"),
    collection: z.array(z.string()),
    tags: z.array(z.string()),
  }),
});

export type IProductSchemaFormFields = z.infer<typeof productSchema>;
 


