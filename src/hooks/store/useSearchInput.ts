import { useSelector } from "react-redux";
import { selectSearchInputState } from "../../../store/slices/searchInputSlice";

export const useSearchInput = () => {
  const searchInput = useSelector(selectSearchInputState);

  return { searchInput }
}