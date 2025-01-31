import queryString from "query-string";
import axiosInstance from "../../lib/axios/axiosInstance";
import { IPagination } from "../../features/owner/types/api";

export type ICreateCityApi = {
  name: string;
  stateId: string
};

export const createCityApi = async (payload: ICreateCityApi) => {
  const data = await axiosInstance.post(`/master/city`, payload);
  return data;
};

export type IGetCityApi = IPagination & {
  name?: string;
  stateId?: string
};

export const getCityApi = async (payload: IGetCityApi) => {
  const stringified = queryString.stringify(payload);
  const data = await axiosInstance.get(`/master/city?${stringified}`);
  return data;
};
