import { useDispatch } from "react-redux";
import { setMovieSearchDataState } from "../../../store/slices/movieSearchDataSlice";

export const useSetMovieSearchData = () => {
  const dispatch = useDispatch();

  const setMovieSearchData = (data: any) => {
    dispatch(setMovieSearchDataState(data))
  }

  return { setMovieSearchData };
}