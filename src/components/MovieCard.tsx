import React, { useState, FC, useEffect } from 'react';

import { useRouter } from "next/router";

import {
  IconButton,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  CardActions
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

import favoriteMoviesStorage from '@/helpers/favoriteMoviesStorage';

interface MovieCardPropsType {
  id: string;
  title: string;
  year: string;
  poster: string;
}

const MovieCard: FC<MovieCardPropsType> = ({ id, title, year, poster }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const router = useRouter();

  const {
    getFavoriteMovies,
    setFavoriteMovies,
    addToFavoriteMovies,
    deleteFavoriteMovie,
  } = favoriteMoviesStorage();

  useEffect(() => {
    const favoriteMovies = getFavoriteMovies();

    if (favoriteMovies && favoriteMovies.hasOwnProperty(id)) {
      setIsFavorite(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const toggleFavoriteHandle = () => {
    const favoriteMovies = getFavoriteMovies();

    if (!favoriteMovies) {
      setFavoriteMovies({
        id,
        title,
        year,
        poster
      })

      setIsFavorite(true);
    } else {
      if (!favoriteMovies?.hasOwnProperty(id)) {
        addToFavoriteMovies({
          id,
          title,
          year,
          poster
        })

        setIsFavorite(true);
      } else {
        deleteFavoriteMovie({ id });

        setIsFavorite(false);
      }
    }
  }

  return (
    <Card
      sx={{ backgroundColor: "#333" }}
    >
      <CardActionArea
        onClick={() => router.push(`/movie/${id}`)}
      >
        <CardMedia
          component="img"
          height="300"
          image={poster === "N/A" ? "" : poster}
          alt={`Poster for ${title} film`}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
          >
            {title}
          </Typography>
          <Typography
            variant="body2"
          >
            {year}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <IconButton
          aria-label="add to favorites"
          onClick={toggleFavoriteHandle}
        >
          <FavoriteIcon color={isFavorite ? "error" : "inherit"} />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default MovieCard;