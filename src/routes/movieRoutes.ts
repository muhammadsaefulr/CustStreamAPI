import moviePageHandler from "handler/moviePageHandler";
import { Hono } from "hono";

const movieRoutes = new Hono();

movieRoutes.get("/", (c) => moviePageHandler.getHomePageMovieList(c));
movieRoutes.get("/movies", (c) => moviePageHandler.getMovieEpisodeLists(c))
movieRoutes.get("/movies/search", (c) => moviePageHandler.getSearchMovies(c))
movieRoutes.get("/movies/play", (c) => moviePageHandler.getMovieVideoPlay(c))
export default movieRoutes;
