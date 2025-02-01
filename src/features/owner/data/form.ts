import { z } from "zod";
import { productSchema } from "../libs/zod-schema";

export type IFormFields = z.infer<typeof productSchema>;

export const INITIAL_PRODUCT_VALUES: IFormFields = {
  detail: {
    description: {
      productDetails: "hello how are you",
      specifications: {
        sleeveLength: "sleeveLength",
        collar: "collar",
        fit: "fit",
        patternType: "patternType",
        occasion: "occasion",
        length: "length",
        hemline: "hemline",
        placket: "placket",
        placketLength: "placketLength",
        cuff: "cuff",
        transparency: "transparency",
        weavePattern: "weavePattern",
        mainTrend: "mainTrend",
        numberOfItems: 1,
        packageContains: "packageContains",
      },
    },
    variations: [
      {
        size: "M",
        price: 0,
        discount: 0,
      },
    ],
    imgLink: [
      {
        value:
          "https://nobero.com/cdn/shop/files/2PackOversizedCargo8_8d462eb6-8cee-40f1-9071-80c8236ae518.webp",
      },
    ],
  },
  productList: {
    color: "Olive",
    price: 800,
    imgLink:
      "https://nobero.com/cdn/shop/files/free-your-mind.jpg?v=1699505964&width=360",
    stock: 10,
    discount: 50,
    category: "67776e638a1cf8d369ebc97e",
    gender: "M",
    collection: ["joggers", "pants"],
    tags: ["name"],
  },
  batchId: "677e52c416c63b4e447f4cf0",
  name: "Zip-Pocket Joggers Olive Green",
  slug: "zip-pocket"

};
