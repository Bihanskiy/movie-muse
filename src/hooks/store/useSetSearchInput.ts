import { useDispatch } from "react-redux";
import { setSearchInputState } from "../../../store/slices/searchInputSlice";

export const useSetSearchInput = () => {
  const dispatch = useDispatch();

  const setSearchInput = (data: string) => {
    dispatch(setSearchInputState(data))
  }

  return { setSearchInput };
}