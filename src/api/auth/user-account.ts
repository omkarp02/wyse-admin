import axiosInstance from "../../lib/axios/axiosInstance";

export const loginApi = async (cred: { email: string; password: string }) => {
  const data = await axiosInstance.post(`/auth/login`, cred);
  return data;
};

export const registerApi = async (cred: {
  email: string;
  password: string;
}) => {
  const data = await axiosInstance.post(`/auth/register`, cred);
  return data;
};

export const handleRefreshTokenApi = async () => {
  const data = await axiosInstance.get(`/auth/handle-refresh-token`);
  return data;
};


export const logoutApi = async () => {
  const data = await axiosInstance.get(`/auth/user/logout`);
  return data;
};
