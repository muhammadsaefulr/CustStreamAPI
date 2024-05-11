import moviePageHandler from "handler/moviePageHandler";
import { Hono } from "hono";

const movieRoutes = new Hono();

movieRoutes.get("/", (c) => moviePageHandler.getHomePageMovieList(c));

export default movieRoutes;
