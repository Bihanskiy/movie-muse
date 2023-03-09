import { createSlice } from "@reduxjs/toolkit";

import { AppState } from "../store";
import { HYDRATE } from "next-redux-wrapper";

interface IMovieSearchResponse<T> {
  Search: T;
  totalResults: string;
}

interface IDefaultResponse<T> {
  res: IMovieSearchResponse<T> | null;
  err: { message: string } | null;
}

interface IMovieSearchData {
  imdbID: string;
  Title: string;
  Year: string;
}

// const movieSearchData: IMovieSearchData = {
//   imdbID: "",
//   Title: "",
//   Year: "",
// }

const movieSearchData: IDefaultResponse<IMovieSearchData> = {
  res: null,
  err: null
}

export interface movieSearchState {
  movieSearchState: IDefaultResponse<IMovieSearchData>;
}

const initialState: movieSearchState = {
  movieSearchState: movieSearchData,
}

export const movieSearchDataSlice = createSlice({
  name: "movieSearchData",
  initialState,
  reducers: {
    setMovieSearchDataState(state, action) {
      state.movieSearchState = action.payload;
    },
    resetMovieSearchDataState: () => initialState,
  },

  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.movieSearchData,
      };
    },
  },
});

export const { setMovieSearchDataState, resetMovieSearchDataState } = movieSearchDataSlice.actions;

export const selectMovieSearchDataState = (state: AppState) => state.movieSearchData.movieSearchState;

export default movieSearchDataSlice.reducer;