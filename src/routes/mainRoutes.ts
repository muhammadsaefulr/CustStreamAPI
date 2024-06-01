import mainHandler from "handler/mainHandler";
import { Hono } from "hono";

const mainRoutes = new Hono()

mainRoutes.get("/pdrain", (c)=> mainHandler.pdrainExtractorHandler(c))

export default mainRoutes