import { Context } from "hono";
import AnimePageServiceOd from "service/otakudesuProvider/animePageService";

class otakudesuPageHandler {
  static getHomePageAnimeList = async (c: Context) => {
    try {
      const responseData = await AnimePageServiceOd.getHomePageAnimeListOd();

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

  static getAnimeGenre = async (c: Context) => {
    try {
      const { pathname, page } = c.req.param();

      const responseData = await AnimePageServiceOd.getGenreAnimeListsOd(pathname, page);

      if (!responseData) {
        return c.json({ message: "Data Tidak Ditemukan !" }, 404);
      }

      return c.json(
        {
          status: 200,
          message: "Berhasil mengambil data !",
          data: responseData,
        },
        200
      );
    } catch (e) {
      throw new Error(`${e}`);
    }
  };

  static getAnimeEpisodeLists = async (c: Context) => {
    try {
      const pathname = c.req.param("pathname");
      const responseData = await AnimePageServiceOd.getAnimeEpisodeListsOd(
        pathname
      );

      if (!responseData) {
        return c.json({ message: "Data Tidak Ditemukan !" }, 404);
      }

      return c.json(
        {
          status: 200,
          message: "Berhasil Mengambil Data !",
          path: pathname,
          data: {
            dataInfo: responseData.AnimeInfo,
            dataEps: responseData.AnimeEps,
          },
        },
        200
      );
    } catch (e) {
      throw new Error(`${e}`);
    }
  };

  static getAnimeVideoPlay = async (c: Context) => {
    try {
      const { pathname } = c.req.param();
      const responseData = await AnimePageServiceOd.getAnimeVideoPlayOd(
        pathname!
      );

      if (!responseData) {
        return c.json({ message: "Data Tidak Ditemukan !" }, 404);
      }

      return c.json(
        {
          status: 200,
          message: "Berhasil Mengambil Data !",
          responseData,
        },
        200
      );
    } catch (e) {
      throw new Error(`${e}`);
    }
  };

  static getSearchAnimes = async (c: Context) => {
    try {
      const dataQuery = c.req.query("q");

      if (!dataQuery) {
        return c.json({ message: "Please insert data on query ?q= !" }, 400);
      }

      const responseData = await AnimePageServiceOd.getSearchAnimeListOd(
        dataQuery
      );

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

export default otakudesuPageHandler;
