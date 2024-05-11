import { Context, Next } from "hono";
import { HTTPException } from "hono/http-exception";
import moviePageService from "service/moviePageService";

class moviePageHandler {
  static getHomePageMovieList = async (c: Context) => {
    try {
      const urlData = c.req.query("url");

      if (!urlData) {
        return c.json({ message: "Please insert data on query ?url= !" }, 400);
      }

      const responseData = await moviePageService.getHomePageMovieList(urlData);

      if (!responseData) {
        return c.json({ message: "Data Tidak Ditemukan !" }, 404);
      }

      return c.json(
        {
          status: 200,
          message: "Berhasil Mengambil Data !",
          data: responseData,
        },
        200
      );
    } catch (e) {
      throw new Error(`${e}`);
    }
  };

  static getMovieEpisodeLists = async (c: Context) => {
    try {
      const urlData = c.req.query("url");

      if (!urlData) {
        return c.json({ message: "Please insert data on query ?url= !" }, 400);
      }

      const responseData = await moviePageService.getMovieEpisodeLists(urlData);

      if (!responseData) {
        return c.json({ message: "Data Tidak Ditemukan !" }, 404);
      }

      return c.json(
        {
          status: 200,
          message: "Berhasil Mengambil Data !",
          data: responseData,
        },
        200
      );
    } catch (e) {
      throw new Error(`${e}`);
    }
  };

  static getMovieVideoPlay = async (c: Context) => {
    try {
      const urlData = c.req.query("url");

      if (!urlData) {
        return c.json({ message: "Please insert data on query ?url= !" }, 400);
      }

      const responseData = await moviePageService.getMovieVideoPlay(urlData);

      if (!responseData) {
        return c.json({ message: "Data Tidak Ditemukan !" }, 404);
      }

      return c.json(
        {
          status: 200,
          message: "Berhasil Mengambil Data !",
          data: responseData,
        },
        200
      );
    } catch (e) {
      throw new Error(`${e}`);
    }
  };

  static getSearchMovies = async (c: Context) => {
    try {
      const urlData = c.req.query("q");
      const urlLink = `https://otakudesu.cloud/?s=${urlData}&post_type=anime`

      if (!urlData) {
        return c.json({ message: "Please insert data on query ?url= !" }, 400);
      }

      const responseData = await moviePageService.getSearchMovieList(urlLink);

      if (!responseData) {
        return c.json({ message: "Data Tidak Ditemukan !" }, 404);
      }

      return c.json(
        {
          status: 200,
          message: "Berhasil Mengambil Data !",
          data: responseData,
        },
        200
      );
    } catch (e) {
      throw new Error(`${e}`);
    }
  };
}

export default moviePageHandler;
