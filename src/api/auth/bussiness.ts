import queryString from "query-string";
import axiosInstance from "../../lib/axios/axiosInstance";
import { IAddress, IContact } from "../../types/api";

// export const getOwnerApi = async (payload: {
//   name?: string | null;
//   page: number;
//   limit: number;
// }) => {
//   const stringified = queryString.stringify(payload);
//   const data = await axiosInstance.get(`/owner?${stringified}`);
//   return data;
// };

export type ICreateBussinessApi = {
  name: string;
  category: string;
  description?: string;
  address: IAddress;
  contacts: IContact[];
  website: string;
  logoUrl: string;
};

export const createBusinessApi = async (payload: ICreateBussinessApi) => {
  const data = await axiosInstance.post(`/bussiness/in-owner`, payload);
  return data;
};
