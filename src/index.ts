import { Hono } from "hono";
import movieRoutes from "routes/movieRoutes";
import { HTTPException } from "hono/http-exception";
import { logger } from "hono/logger";
import { errorHandler } from "middleware/middleware";

const app = new Hono();

app.onError(errorHandler)
app.get("/", (c) => c.json({ message: "Service Is Up !" }, 200));
app.route("/main", movieRoutes);

app.use("*", logger());

export default {
  port: 3000,
  fetch: app.fetch,
};
