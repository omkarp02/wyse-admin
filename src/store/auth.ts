import { StateCreator } from "zustand";

type IAuthState = {
  token: string | null;
};

type IAuthAction = {
  setToken(token: string): void;
};

export type IAuthStore = IAuthAction & IAuthState;

export const authStore: StateCreator<IAuthStore> = (set) => ({
  token: null,
  setToken(token) {
    set({ token: token });
  },
});
