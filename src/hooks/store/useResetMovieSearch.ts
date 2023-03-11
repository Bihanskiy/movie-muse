import { useDispatch } from "react-redux";
import { resetMovieSearchDataState } from "../../../store/slices/movieSearchDataSlice";

export const useResetMovieSearch = () => {
  const dispatch = useDispatch();

  const resetMovieSearch = () => {
    dispatch(resetMovieSearchDataState())
  }

  return { resetMovieSearch };
}