import React, { FC } from 'react';

import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Image from 'next/image';

import {
  Box,
  Typography,
  Breadcrumbs,
  Link,
} from '@mui/material';

import styles from '@/styles/Movie.module.scss';

import Layout from '@/layouts/MainLayout';
import BackButton from '@/components/buttons/BackButton';
import MoviesService from '@/services/MoviesService';

import { IMovieDetailsData } from '@/types/MoviesType';

import Film_image from "../../assets/images/Film_image.jpg";

interface MovieType {
  movieData: {
    data: IMovieDetailsData;
    error: string;
  }
}

const Header = () => {
  const router = useRouter();

  return (
    <Box className={styles.header}>
      <BackButton
        onClickHandler={() => router.back()}
      />
      <Box className={styles.navigationHistory}>
        <Breadcrumbs
          aria-label="breadcrumb"
          sx={{
            "& .MuiBreadcrumbs-ol": {
              justifyContent: "center"
            }
          }}
        >
          <Link
            underline="hover"
            color="inherit"
            onClick={() => router.back()}
          >
            Home
          </Link>
          <Typography color="text.primary">Details</Typography>
        </Breadcrumbs>
      </Box>
    </Box>
  )
}

const Movie: FC<MovieType> = ({ movieData }) => {
  const router = useRouter();

  if (movieData?.error) {
    return (
      <Layout title={"Movie site"}>
        <Box
          component="section"
          className={styles.movieSection}
        >
          <Header />
          <Box className={styles.main}>
            <Typography color="error">
              Ooops... {movieData.error}
            </Typography>
          </Box>
        </Box>
      </Layout>
    )
  }


  return (
    <Layout
      title={"Movie site -" + movieData?.data?.Title}
      keywords={"Movie detail" + movieData?.data?.Title + movieData?.data?.Actors}
    >
      <Box
        component="section"
        className={styles.movieSection}
      >
        <Header />
        <Box className={styles.main}>
          <Box className={styles.imageContainer}>
            <Image
              src={movieData?.data?.Poster === "N/A" ? Film_image : movieData?.data?.Poster}
              layout="fill"
              className={styles.image}
              alt={`Poster for ${movieData?.data?.Title} film`}
            />
          </Box>
          <Box className={styles.infoContainer}>
            <Typography
              variant="h5"
              component="h5"
              className={styles.movieTitle}
            >
              {movieData?.data?.Title}
            </Typography>
            <Typography>
              {movieData?.data?.Year}, {movieData?.data?.Country}
            </Typography>
            <Typography>
              {movieData?.data?.Genre}
            </Typography>
            <Typography>
              IMDB Rating {movieData?.data?.imdbRating}
            </Typography>
          </Box>
        </Box>
        <Box className={styles.descriptionContainer}>
          <Box className={styles.descriptionBox}>
            <Typography className={styles.descriptionTitle}>
              Actors
            </Typography>
            <Typography>
              {movieData?.data?.Actors}
            </Typography>
          </Box>
          <Box className={styles.descriptionBox}>
            <Typography className={styles.descriptionTitle}>
              Plot
            </Typography>
            <Typography>
              {movieData?.data?.Plot}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Layout>
  )
}

export default Movie;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = params?.id;

  const movieResponse = await MoviesService.GetMoviesById(id as string) as any;

  return {
    props: {
      movieData: {
        data: movieResponse?.data ?? null,
        error: movieResponse?.error ?? null,
      }
    }
  }

}