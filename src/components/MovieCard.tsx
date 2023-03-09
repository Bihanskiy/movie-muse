import * as React from 'react';

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

const MovieCard = () => {
  return (
    <Card
      sx={{ maxWidth: 345, backgroundColor: "#333"}}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="250"
          image="/static/images/cards/contemplative-reptile.jpg"
          alt="green iguana"
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
          >
            Lizard
          </Typography>
          <Typography
            variant="body2"
          >
            Lizards are a widespread group of squamate reptiles
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default MovieCard;