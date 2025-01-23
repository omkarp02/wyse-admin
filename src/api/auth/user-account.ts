import axios from "axios";
import axiosInstance from "../../lib/axios/axiosInstance";
import { BACKEND_URL } from "../../constants/common";

export const loginApi = async (cred: { userId: string; password: string }) => {
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
  const data = await axios.get(`${BACKEND_URL}/auth/handle-refresh-token`, {withCredentials: true});
  return data;
};


export const logoutApi = async () => {
  const data = await axiosInstance.get(`/auth/user/logout`);
  return data;
};
