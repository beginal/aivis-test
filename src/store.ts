import { createContext } from "react";
import { UseBoundStore, create } from "zustand";

export type InitialState<M extends (...args: any) => any> = ReturnType<M>;
// store를 사용할때 어떤 타입의 store인지 만들어주는 타입
export type UseStoreState<M> = M extends (...args: never) => UseBoundStore<infer T> ? T : never;

interface InitialValueType {
  token: string;
  shortTermToken: string;
  setInitialValue: (token: string, shortTermToken: string) => void;
}

export const useInitialValueStore = create<InitialValueType>(set => ({
  token: "",
  shortTermToken: "",
  setInitialValue: (token, shortTermToken) =>
    set(state => ({
      token,
      shortTermToken,
    })),
}));
