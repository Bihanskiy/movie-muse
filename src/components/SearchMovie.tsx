import React, { useState } from 'react';

import {
  styled,
  alpha,
  InputBase,
  CircularProgress,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import { useRequest } from '@/hooks/useRequest';
import MoviesService from '@/services/MoviesService';
import { useSetMovieSearchData } from '@/hooks/store/useSetMovieSearchData';
import { useResetMovieSearch } from '@/hooks/store/useResetMovieSearch';
import { useSetSearchInput } from '@/hooks/store/useSetSearchInput';
import { useSearchInput } from '@/hooks/store/useSearchInput';
import { usePagination } from '@/hooks/usePagination';
import withRouterIsReady from '@/HOCS/withRouterIsReady';


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const LoadingIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  right: 0,
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  display: 'flex',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1.5, 7, 1.5, 7),
    width: '100%',
    fontSize: '18px'
  },
}));

const SearchMovie = () => {
  const { setSearchInput } = useSetSearchInput();
  const { searchInput } = useSearchInput();

  const { setMovieSearchData } = useSetMovieSearchData();
  const { resetMovieSearch } = useResetMovieSearch();

  const { initialPaginationRequest } = usePagination();

  const [timer, setTimer] = useState<ReturnType<typeof setTimeout> | null>(null);

  const {
    loading: isMoviesLoading,
    request: getMoviesRequest
  } = useRequest(MoviesService.GetMoviesByTitle);

  const searchMovieHandle = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const titleText = e.target.value;
    setSearchInput(titleText);

    if (timer) {
      clearTimeout(timer);
    }

    if (titleText.length > 0) {
      setTimer(
        setTimeout(async () => {
          const response = await initialPaginationRequest({
            request: () => getMoviesRequest(titleText),
          })
          setMovieSearchData(response);
        }, 700)
      )
    } else {
      resetMovieSearch();
    }
  }

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon fontSize='medium' />
      </SearchIconWrapper>
      <LoadingIconWrapper>
        {isMoviesLoading &&
          <CircularProgress
            color='success'
            size={25}
          />
        }
      </LoadingIconWrapper>
      <StyledInputBase
        placeholder="Search…"
        inputProps={{ 'aria-label': 'search' }}
        value={searchInput}
        onChange={searchMovieHandle}
      />
    </Search>
  )
}

export default withRouterIsReady(SearchMovie);