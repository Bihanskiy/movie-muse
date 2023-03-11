import { createSlice } from "@reduxjs/toolkit";

import { AppState } from "../store";

export interface SearchInputState {
  searchInputState: string;
}

const initialState: SearchInputState = {
  searchInputState: "",
}

export const searchInputSlice = createSlice({
  name: "searchInputState",
  initialState,
  reducers: {
    setSearchInputState(state, action) {
      state.searchInputState = action.payload;
    },
    resetSearchInputState: () => initialState,
  }
});

export const { setSearchInputState, resetSearchInputState } = searchInputSlice.actions;

export const selectSearchInputState = (state: AppState) => state.searchInputState.searchInputState;

export default searchInputSlice.reducer;