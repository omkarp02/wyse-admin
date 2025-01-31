import { IPagination } from "../../features/owner/types/api";
import axiosInstance from "../../lib/axios/axiosInstance";
import queryString from "query-string";

export type ICreateFilter = {
  type: string;
  name: string;
  category: string;
};

export type ICreateFilterType = {
  name: string;
};

export type IFindFilter = IPagination & {
  category?: string;
  type?: string
};


export const createFilterApi = async (payload: ICreateFilter) => {
  const data = await axiosInstance.post(`/filter`, payload);
  return data;
};


export const getFilterApi = async (payload: IFindFilter) => {
  const stringified = queryString.stringify(payload);
  const data = await axiosInstance.get(`/filter?${stringified}`);
  return data;
};

export type IGET_FILTER_TYPE = {
  id: string
  name: string;
};

export const getFilterTypeApi = async (payload: IPagination) => {
  const stringified = queryString.stringify(payload);
  const data = await axiosInstance.get(`/filter/type?${stringified}`);
  return data;
};

export const createFilterTypeApi = async (payload: ICreateFilterType) => {
  const data = await axiosInstance.post(`/filter/type`, payload);
  return data;
};
