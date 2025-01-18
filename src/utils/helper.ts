import { useBoundStore } from "../store/store";

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

let persistedToken: string | null = null;

export const getToken = () => {
  if (!persistedToken) {
    const { token } = useBoundStore.getState();
    persistedToken = token;
    return token;
  } else {
    return persistedToken;
  }
};
