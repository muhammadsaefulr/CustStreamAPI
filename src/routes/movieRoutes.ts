import otakudesuPageHandler from "handler/otakudesuPageHandler.ts";
import { Hono } from "hono";

const movieRoutes = new Hono();

movieRoutes.get("/otakudesu", (c) => otakudesuPageHandler.getHomePageMovieList(c));
movieRoutes.get("/otakudesu/search", (c) => otakudesuPageHandler.getSearchMovies(c))
movieRoutes.get("/otakudesu/episodes", (c) => otakudesuPageHandler.getMovieEpisodeLists(c))
movieRoutes.get("/otakudesu/play", (c) => otakudesuPageHandler.getMovieVideoPlay(c))
export default movieRoutes;
