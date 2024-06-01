import { Hono } from "hono";
import animeRoutes from "routes/animeRoutes";
import { HTTPException } from "hono/http-exception";
import { logger } from "hono/logger";
import { errorHandler } from "middleware/middleware";
import { cors } from "hono/cors";
import mainRoutes from "routes/mainRoutes";
const app = new Hono();

app.onError(errorHandler);
app.get("/", (c) => c.json({ message: "Service Is Up !" }, 200));
app.route("/main/api/service", animeRoutes);
app.route("/main/api", mainRoutes);

app.use(
  "*",
  logger(),
  cors({
    origin: "http://localhost:5173",
    allowMethods: ["POST", "GET", "OPTIONS"],
    maxAge: 600,
    credentials: false,
  })
);

export default {
  port: 4000,
  fetch: app.fetch,
};
