import axiosInstance from "../../lib/axios/axiosInstance";

export type ICreateCategoryApi = {
  description: string;
  icon: string;
  imgLink: string;
  isActive: boolean;
  name: string;
  slug: string;
};

export const createCategoryApi = async (payload: ICreateCategoryApi) => {
  const data = await axiosInstance.post(`/category`, payload);
  return data;
};
