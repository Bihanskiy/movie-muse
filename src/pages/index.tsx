import React, { useEffect } from 'react';

import { useRouter } from "next/router";

import {
  Box,
  Typography,
  Grid,
} from '@mui/material';
import Pagination from '@mui/material/Pagination';

import styles from '@/styles/Home.module.scss';

import Layout from '@/layouts/MainLayout';
import MovieCard from '@/components/MovieCard';
import SearchMovie from '@/components/SearchMovie';

import MoviesService from '@/services/MoviesService';
import { useRequest } from '@/hooks/useRequest';
import { useMovieSearchData } from '@/hooks/store/useMovieSearchData';
import { usePagination } from '@/hooks/usePagination';
import { useSearchInput } from '@/hooks/store/useSearchInput';
import { useSetMovieSearchData } from '@/hooks/store/useSetMovieSearchData';
import withSearchInputText from '@/HOCS/withSearchInputText';


const Home = () => {
  const router = useRouter();
  const page = parseInt(router.query?.page as string || "1", 10);

  const { movieSearchData } = useMovieSearchData();
  const { setMovieSearchData } = useSetMovieSearchData();

  const { searchInput } = useSearchInput();

  const { paginationRequest } = usePagination();

  const {
    loading: isMoviesloading,
    request: getMoviesRequest
  } = useRequest(MoviesService.GetMoviesByTitle);

  useEffect(() => {
    if (!searchInput) {

    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handlePaginationChange = async (e: React.ChangeEvent<unknown>, page: number) => {
    const response = await paginationRequest({
      request: () => getMoviesRequest(searchInput, page),
      page,
    })

    setMovieSearchData(response);
  }

  return (
    <Layout>
      <Box
        component="section"
        className={styles.movies}
      >
        <Box className={styles.header}>
          <Typography
            variant="h1"
            component="h1"
            className={styles.title}
          >
            Unlimited movies, TV shows, and more.
          </Typography>
        </Box>
        <Box className={styles.searchWrapper}>
          <SearchMovie />
        </Box>
        {movieSearchData.err &&
          <Typography
            color="secondary"
            className={styles.errorText}
          >
            {movieSearchData.err.message}
          </Typography>
        }
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          className={styles.moviesWrapper}
        >
          {movieSearchData?.res?.Search?.map(movie => {
            return (
              <Grid
                item
                xs={4}
                key={movie.imdbID}
              >
                <MovieCard
                  id={movie.imdbID}
                  title={movie.Title}
                  year={movie.Year}
                  poster={movie.Poster}
                />
              </Grid>
            )
          })}
        </Grid>
        {movieSearchData?.res?.totalResults &&
          Number(movieSearchData?.res?.totalResults) > 10 &&
          <Pagination
            count={Math.ceil(Number(movieSearchData.res.totalResults) / 10)}
            size="large"
            color="secondary"
            className="pagination"
            page={page}
            onChange={handlePaginationChange}
            sx={{
              "& .MuiPagination-ul": {
                justifyContent: "center",
              }
            }}
          />
        }
      </Box>
    </Layout>
  )
}


export default withSearchInputText(Home);