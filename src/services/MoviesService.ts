import api from "@/api/Api";
import { API_KEY } from "@/constants/api";
import { AxiosResponse } from "axios";

export default class MoviesService {
  static async GetMoviesByTitle(title: string | number): Promise<AxiosResponse> {
    return api.get(`?apikey=${API_KEY}&s=${title}&page=1`)
  }

  static async GetMoviesById(id: string | number): Promise<AxiosResponse> {
    return api.get(`?apikey=${API_KEY}&t=${id}`)
  }
}


