import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";

import { movieSearchDataSlice } from "./slices/movieSearchDataSlice";
import { searchInputSlice } from "./slices/searchInputSlice";


const makeStore = () =>
  configureStore({
    reducer: {
      [movieSearchDataSlice.name]: movieSearchDataSlice.reducer,
      [searchInputSlice.name]: searchInputSlice.reducer,
    },
    devTools: true,
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export const wrapper = createWrapper<AppStore>(makeStore);