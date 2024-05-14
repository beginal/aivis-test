// import { createContext } from "react";
// import { UseBoundStore } from "zustand";

// // initialState의 타입을 만들어주는 타입
// export type InitialState<M extends (...args: any) => any> = ReturnType<M>;
// // store를 사용할때 어떤 타입의 store인지 만들어주는 타입
// export type UseStoreState<M> = M extends (...args: never) => UseBoundStore<infer T> ? T : never;

// //스토어를 let으로 선언해두고 뒤에 store가 이미 생성되어 있는지 확인할 것입니다.
// let store: any;
// //initializeUserStore는 아래에서 store를 만들어주는 함수입니다.
// const userContext = createContext<UseStoreState<typeof initializeUserStore>>();
// export const UserProvider = userContext.Provider;
// export const useUserStore = userContext.useStore;
