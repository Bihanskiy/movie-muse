import { useSelector } from "react-redux";
import { selectMovieSearchDataState } from "../../../store/slices/movieSearchDataSlice";

export const useMovieSearchData = () => {
  const movieSearchData = useSelector(selectMovieSearchDataState);

  return { movieSearchData }
}