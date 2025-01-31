import { IPagination } from "../../features/owner/types/api";
import axiosInstance from "../../lib/axios/axiosInstance";
import queryString from "query-string";

export type ICreateBatchApi = {
  name: string;
};

export const createBatchApi = async (payload: ICreateBatchApi) => {
  const data = await axiosInstance.post(`/product/batch`, payload);
  return data;
};

export const getBatchApi = async (payload: IPagination) => {
  const stringified = queryString.stringify(payload);
  const data = await axiosInstance.get(`/product/batch?${stringified}`);
  return data;
};

