import LocalStorageService from '@/services/LocalStorageService';


const favoriteMoviesStorage = () => {

  const getFavoriteMovies = () => LocalStorageService.getItem("favoriteMovies") as { [key: string]: object } | null;

  const setFavoriteMovies = ({ id, title, year, poster }: { id: string; title: string; year: string; poster: string; }) => {
    LocalStorageService.setItem(
      "favoriteMovies",
      {
        [id]: {
          id,
          title,
          year,
          poster,
        }
      }
    )

    window.dispatchEvent(new Event("storage"));
  }

  const addToFavoriteMovies = ({ id, title, year, poster }: { id: string; title: string; year: string; poster: string; }) => {
    const favoriteMovies = getFavoriteMovies();
    LocalStorageService.setItem(
      "favoriteMovies",
      {
        ...favoriteMovies,
        [id]: {
          id,
          title,
          year,
          poster,
        }
      }
    )

    window.dispatchEvent(new Event("storage"));
  }

  const deleteFavoriteMovie = ({ id }: { id: string }) => {
    const favoriteMovies = getFavoriteMovies();

    if (favoriteMovies) {
      delete favoriteMovies[id];

      if (Object.keys(favoriteMovies).length === 0) {
        LocalStorageService.removeItem("favoriteMovies");
      } else {
        LocalStorageService.setItem(
          "favoriteMovies",
          favoriteMovies
        )
      }
    }

    window.dispatchEvent(new Event("storage"));
  }

  return {
    getFavoriteMovies,
    setFavoriteMovies,
    addToFavoriteMovies,
    deleteFavoriteMovie,
  }
}

export default favoriteMoviesStorage;