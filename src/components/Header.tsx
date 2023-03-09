import React, { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

import { useRequest } from '@/hooks/useRequest';
import MoviesService from '@/services/MoviesService';
import { useMovieSearchData } from '@/hooks/store/useMovieSearchData';
import { useSetMovieSearchData } from '@/hooks/store/useSetMovieSearchData';



const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
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

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const Header = () => {
  const [movieTitle, setMovieTitle] = useState("");

  const { movieSearchData } = useMovieSearchData();
  const { setMovieSearchData } = useSetMovieSearchData();

  const [timer, setTimer] = useState<ReturnType<typeof setTimeout> | null>(null);


  console.log(movieSearchData);


  const {
    request: getMoviesRequest
  } = useRequest(MoviesService.GetMoviesByTitle);

  const searchMovieHandle = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const titleText = e.target.value;
    setMovieTitle(titleText);

    if (timer) {
      clearTimeout(timer);
    }
    setTimer(
      setTimeout(async () => {
        const response = await getMoviesRequest(titleText);
        setMovieSearchData(response);
      }, 700)
    )
  }

  return (
    <AppBar
      position="static"
    >
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="open drawer"
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{
            flexGrow: 1,
            display: { xs: 'none', sm: 'block' },
            fontWeight: 700,
          }}
        >
          Movie Muse
        </Typography>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
            value={movieTitle}
            onChange={searchMovieHandle}
          />
        </Search>
      </Toolbar>
    </AppBar>
  );
}

export default Header;