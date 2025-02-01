import axiosInstance from "../../lib/axios/axiosInstance";

type IProductDetail = {
  description: {
    productDetails: string;
    specifications: {
      sleeveLength?: string;
      collar?: string;
      fit?: string;
      patternType?: string;
      occasion?: string;
      length?: string;
      hemline?: string;
      placket?: string;
      placketLength?: string;
      cuff?: string;
      transparency?: string;
      weavePattern?: string;
      mainTrend?: string;
      numberOfItems?: number;
      packageContains?: string;
    };
  };
  variations: {
    size: string;
    price: number;
  }[];
  imgLink: string[];
};

type IProductList = {
  color: string;
  price: number;
  imgLink: string;
  stock: number;
  discount: number;
  category: string;
  gender: string;
  collection: string[];
  tags: string[];
};

export type ICreateProductApi = {
  detail: IProductDetail;
  productList: IProductList;
  slug: string;
  name: string;
  batchId: string;
};

export const createProductApi = async (payload: ICreateProductApi) => {
  const data = await axiosInstance.post(`/product`, payload);
  return data;
};
