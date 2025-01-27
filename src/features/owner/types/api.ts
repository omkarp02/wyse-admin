import { z } from "zod";
import { productSchema } from "../libs/zod-schema";

export type IProductFormFields = z.infer<typeof productSchema>; 