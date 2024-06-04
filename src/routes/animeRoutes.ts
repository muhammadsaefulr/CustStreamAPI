import otakudesuPageHandler from "handler/otakudesuPageHandler.ts";
import { Hono } from "hono";

const animeRoutes = new Hono();

animeRoutes.get("/otakudesu", (c) => otakudesuPageHandler.getHomePageAnimeList(c));
animeRoutes.get("/otakudesu/search", (c) => otakudesuPageHandler.getSearchAnimes(c))
animeRoutes.get("/otakudesu/watch/:pathname", (c) => otakudesuPageHandler.getAnimeEpisodeLists(c))
animeRoutes.get("/otakudesu/play/:pathname", (c) => otakudesuPageHandler.getAnimeVideoPlay(c))
animeRoutes.get("/otakudesu/genre/:pathname/:page", (c) => otakudesuPageHandler.getAnimeGenre(c))
export default animeRoutes;
