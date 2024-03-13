import axios from "@/lib/axios";

export async function getMovies() {
  const res = await axios.get("/movies/");
  const newMovies = res.data.results ?? [];
  return newMovies;
}

export async function getSearchMovies(q){
  const res = await axios.get(`/movies?q=${q}`);
  const newMovies = res.data.results ?? [];
  return newMovies;
}

export async function getMovie(targetId) {
  const res = await axios.get(`/movies/${targetId}`);
  const newMovies = res.data;
  return newMovies;
}

export async function getMovieReviews(targetId) {
  const res = await axios.get(`/movie_reviews/?movie_id=${targetId}`);
  const nextMovieReviews = res.data.results ?? [];
  return nextMovieReviews;
}

