import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { authSlice, IAuthSlice } from "./auth";
import { immer } from "zustand/middleware/immer";

type IBoundStore = IAuthSlice;

export const useBoundStore = create<IBoundStore>()(
  devtools(
    persist(
      immer((...a) => ({
        ...authSlice(...a),
      })),
      {
        name: "store",
      }
    )
  )
);
