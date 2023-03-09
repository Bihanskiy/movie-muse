import React, { useEffect } from 'react'

import Head from 'next/head'

import {
  Box,
  Typography
} from '@mui/material'
import styles from '@/styles/Home.module.scss'

import Layout from '@/layouts/MainLayout'
import MovieCard from '@/components/MovieCard'

import MoviesService from '@/services/MoviesService'
import { useRequest } from '@/hooks/useRequest'
import Pagination from '@mui/material/Pagination';
import { useRouter } from "next/router";
import withRouterIsReady from '@/HOCS/withRouterIsReady'


const Home = () => {
  const router = useRouter();

  const page = parseInt(router.query?.page as string || "1", 10);



  const {
    loading: isMoviesloading,
    error: moviesError,
    data: movies,
    request: getMoviesRequest
  } = useRequest(MoviesService.GetMoviesByTitle);

  const fetchMovies = async () => {
    const response = await getMoviesRequest("Iron Man");

  }



  useEffect(() => {
    fetchMovies();
  }, [])

  function handlePaginationChange(e: React.ChangeEvent<unknown>, page: number) {
    router.push(
      {
        query: {
          page,
        }
      },
      undefined,
      { shallow: true });
  }

  return (
    <Layout>
      <section className={styles.movies}>
        <Box className={styles.header}>
          <Typography
            variant="h1"
            component="h1"
            className={styles.title}
          >
            Unlimited movies, TV shows, and more.
          </Typography>
        </Box>
        <Box className={styles.moviesWrapper}>
          <Pagination
            count={10}
            variant='outlined'
            color='secondary'
            className='pagination'
            page={page}
            onChange={handlePaginationChange}
          />
          <MovieCard />
        </Box>
      </section>
    </Layout>
  )
}


export default Home;