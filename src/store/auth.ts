import { StateCreator } from "zustand";

type IAuthState = {
  token: string | null;
};

type IAuthAction = {
  setToken(token: string): void;
};

export type IAuthSlice = IAuthAction & IAuthState;

export const authSlice: StateCreator<IAuthSlice> = (set) => ({
  token: null,
  setToken(token) {
    set({ token: token });
  },
});
