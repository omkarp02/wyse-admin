import { z } from "zod";
import { productSchema } from "../libs/zod-schema";


export type IPagination = {page: number, limit: number}