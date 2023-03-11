import api from "@/api/Api";
import { API_KEY } from "@/constants/api";
import { AxiosResponse } from "axios";

export default class MoviesService {
  static async GetMoviesByTitle(title: string | number, page = 1): Promise<AxiosResponse> {
    return api.get(`?apikey=${API_KEY}&s=${title}&page=${page}`)
  }

  static async GetMoviesById(id: string | number): Promise<AxiosResponse> {
    return api.get(`?apikey=${API_KEY}&i=${id}&plot=full`)
  }
}


