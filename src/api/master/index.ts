import queryString from "query-string";
import axiosInstance from "../../lib/axios/axiosInstance";
import { IPagination } from "../../features/owner/types/api";

export type ICreateMasterApi = {
  type: string;
  name: string;
};

export const createMasterApi = async (payload: ICreateMasterApi) => {
  const data = await axiosInstance.post(`/master`, payload);
  return data;
};

export type IGetMasterApi = IPagination &  {
  types: string[];
};

export const getMasterApi = async (payload: IGetMasterApi) => {
  const stringified = queryString.stringify(payload);
  const data = await axiosInstance.get(`/master?${stringified}`);
  return data;
};
