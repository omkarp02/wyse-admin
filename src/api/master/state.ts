import queryString from "query-string";
import axiosInstance from "../../lib/axios/axiosInstance";
import { IPagination } from "../../features/owner/types/api";

export type ICreateStateApi = {
  name: string;
};

export const createStateApi = async (payload: ICreateStateApi) => {
  const data = await axiosInstance.post(`/master/state`, payload);
  return data;
};

export type IGetStateApi = IPagination & {
  name?: string;
};

export const getStateApi = async (payload: IGetStateApi) => {
  const stringified = queryString.stringify(payload);
  const data = await axiosInstance.get(`/master/state?${stringified}`);
  return data;
};
