import WebScraperOtakudesu from "utils/scrapper/otakudesu/readCustomProvider";

class AnimePageServiceOd {

  static async getHomePageAnimeListOd() {
    const data = await WebScraperOtakudesu.scrapeHomePage();

    return data;
  }

  static async getGenreAnimeListsOd(pathname: string) {
    const dataPath = `genres/${pathname}`
    const data = await WebScraperOtakudesu.scrapeGenreAnimes(dataPath)

    return data
  }

  static async getAnimeEpisodeListsOd(pathname: string){
    const dataPath = `anime/${pathname}`
    const data = await WebScraperOtakudesu.scrapeAnimeEpisodes(dataPath)

    return data;
  }

  static async getAnimeVideoPlayOd(pathname: string){
    const dataPath = `episode/${pathname}`
    const data = await WebScraperOtakudesu.scrapeVideoAnimeSource(dataPath)

    return data
  }

  static async getSearchAnimeListOd(query: string) {
    const dataQuery = `?s=${query}&post_type=anime`
    const data = await WebScraperOtakudesu.scrapeSearchAnimeByTitle(dataQuery)

    return data
  }
}

export default AnimePageServiceOd;
