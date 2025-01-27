import axiosInstance from "../../lib/axios/axiosInstance";

export type ICreateFilter = {
  type: string;
  name: string;
  category: string;
};

export type ICreateFilterType = {
  name: string;
};

export const createFilterApi = async (payload: ICreateFilter) => {
  const data = await axiosInstance.post(`/filter`, payload);
  return data;
};


export const createFilterTypeApi = async (payload: ICreateFilterType) => {
  const data = await axiosInstance.post(`/filter/type`, payload);
  return data;
};
