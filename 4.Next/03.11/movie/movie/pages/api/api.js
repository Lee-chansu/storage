import axios from "@/lib/axios";

export async function getMovieReviews() {
  const res = await axios.get('/film-reviews');
  const nextMovies = res.data.results;
  console.log(nextMovies)
  return nextMovies;
}
