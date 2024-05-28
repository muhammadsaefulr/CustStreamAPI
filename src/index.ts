import { Hono } from "hono";
import movieRoutes from "routes/movieRoutes";
import { HTTPException } from "hono/http-exception";
import { logger } from "hono/logger";
import { errorHandler } from "middleware/middleware";
import { cors } from "hono/cors";
const app = new Hono();

app.onError(errorHandler);
app.get("/", (c) => c.json({ message: "Service Is Up !" }, 200));
app.route("/main", movieRoutes);

app.use("*", logger(), cors({
  origin: "http://localhost:5173",
  allowMethods: ["POST", "GET", "OPTIONS"],
  maxAge: 600,
  credentials: false,
}));

export default {
  port: 4000,
  fetch: app.fetch,
};
