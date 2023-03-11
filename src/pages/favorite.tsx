import React, { useState, useEffect } from 'react';

import { useRouter } from "next/router";

import {
  Box,
  Typography,
  Grid,
} from '@mui/material';

import styles from '@/styles/Favorite.module.scss';

import Layout from '@/layouts/MainLayout';

import favoriteMoviesStorage from '@/helpers/favoriteMoviesStorage';

import MovieCard from '@/components/MovieCard';
import LocalStorageService from '@/services/LocalStorageService';


const Favorite = () => {
  const [favoriteMoviesData, setFavoriteMoviesData] = useState<object | null>(null);

  const {
    getFavoriteMovies,
  } = favoriteMoviesStorage();


  useEffect(() => {
    const checkFavoriteMovies = () => {
      const favoriteMovies = getFavoriteMovies();

      if (favoriteMovies) {
        setFavoriteMoviesData(favoriteMovies);
      } else {
        setFavoriteMoviesData(null);
      }
    }

    window.addEventListener('storage', checkFavoriteMovies)
    return () => window.removeEventListener('storage', checkFavoriteMovies);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const favoriteMovies = getFavoriteMovies();

    if (favoriteMovies) {
      setFavoriteMoviesData(favoriteMovies);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Layout title={"Favorite movies"}>
      <Box
        component="section"
        className={styles.favoriteSection}
      >
        <Box className={styles.header}>
          <Typography
            variant="h1"
            component="h1"
            className={styles.title}
          >
            My favorite movies
          </Typography>
        </Box>
        {favoriteMoviesData ?
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
            className={styles.moviesWrapper}
          >
            {Object.values(favoriteMoviesData)?.map(movie => {
              return (
                <Grid
                  item
                  xs={4}
                  key={movie.id}
                >
                  <MovieCard
                    id={movie.id}
                    title={movie.title}
                    year={movie.year}
                    poster={movie.poster}
                  />
                </Grid>
              )
            })}
          </Grid>
          :
          <Typography
            color="secondary"
            className={styles.noDataText}
          >
            No favorite movies
          </Typography>
        }
      </Box>
    </Layout>
  )
}
export default Favorite;
