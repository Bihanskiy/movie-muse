import { useDispatch } from "react-redux";
import { resetSearchInputState } from "../../../store/slices/searchInputSlice";

export const useResetSearchInput = () => {
  const dispatch = useDispatch();

  const resetSearchInput = () => {
    dispatch(resetSearchInputState())
  }

  return { resetSearchInput };
}