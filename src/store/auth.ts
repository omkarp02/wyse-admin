import { StateCreator } from "zustand";
import { ROLE } from "../constants/common";
import { logoutApi } from "../api/auth/user-account";

const AUTH_INITIAL_STATE = {
  token: null,
  role: null,
};

type IAuthState = {
  token: string | null;
  role: ROLE | null;
};

type IAuthAction = {
  setAuth(token: string, role: ROLE): void;
  logout(): Promise<void>;
  reset(): void;
};

export type IAuthSlice = IAuthAction & IAuthState;

export const authSlice: StateCreator<IAuthSlice> = (set) => ({
  ...AUTH_INITIAL_STATE,
  setAuth(token, role) {
    set({ token: token, role: role });
  },
  async logout() {
    set(AUTH_INITIAL_STATE);
    logoutApi();
  },
  reset(){
    set(AUTH_INITIAL_STATE)
  }
});
