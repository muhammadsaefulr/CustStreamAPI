import { Hono } from "hono";
import WebScraper from "utils/scrapper/readCustomProvider";

const app = new Hono();

app.get("/", async (c) => {
  const dataRes = await WebScraper.scrapeHomePage("https://otakudesu.cloud") 
  return c.json({message: "Hello", data: dataRes}, 200);
});

export default { 
  port: 3000, 
  fetch: app.fetch, 
} 