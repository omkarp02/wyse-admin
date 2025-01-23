import queryString from "query-string";
import axiosInstance from "../../lib/axios/axiosInstance";

export const getOwnerApi = async (payload: {
  name?: string | null;
  page: number;
  limit: number;
}) => {
  const stringified = queryString.stringify(payload);
  const data = await axiosInstance.get(`/owner?${stringified}`);
  return data;
};

export type ICreateOwnerApi = {
  name: string;
  email: string;
  firstname: string;
  lastname: string;
  dateofbirth: Date;
  mobileNo: string;
  gender: string;
  password: string;
};

export const createOwnerApi = async (payload: ICreateOwnerApi) => {
  const data = await axiosInstance.post(`/user/create-owner`, payload);
  return data;
};
