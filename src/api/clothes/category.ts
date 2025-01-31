import queryString from "query-string";
import { STATUS } from "../../constants/common";
import axiosInstance from "../../lib/axios/axiosInstance";
import { IPagination } from "../../features/owner/types/api";

export type ICreateCategoryApi = {
  description: string;
  icon: string;
  imgLink: string;
  status: STATUS;
  name: string;
  slug: string;
};

export const createCategoryApi = async (payload: ICreateCategoryApi) => {
  const data = await axiosInstance.post(`/category`, payload);
  return data;
};

export type IGET_CATEGORY = {
  catId: string,
  name: string,
  slug: string,
  id: string
}

export const getCategoryApi = async (payload: IPagination) => {
  const stringified = queryString.stringify(payload);
  const data = await axiosInstance.get(`/category/admin?${stringified}`);
  return data;
};
