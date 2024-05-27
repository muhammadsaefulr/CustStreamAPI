import WebScraperOtakudesu from "utils/scrapper/otakudesu/readCustomProvider";

class moviePageServiceOd {

  static async getHomePageMovieListOd() {
    const data = await WebScraperOtakudesu.scrapeHomePage();

    return data;
  }

  static async getMovieEpisodeListsOd(pathname: string){
    const dataPath = `anime/${pathname}`
    const data = await WebScraperOtakudesu.scrapeMovieEpisodes(dataPath)

    return data;
  }

  static async getMovieVideoPlayOd(pathname: string){
    const dataPath = `episode/${pathname}`
    const data = await WebScraperOtakudesu.scrapeVideoMovieSource(dataPath)

    return data
  }

  static async getSearchMovieListOd(query: string) {
    const dataQuery = `?s=${query}&post_type=anime`
    const data = await WebScraperOtakudesu.scrapeSearchMovieByTitle(dataQuery)

    return data
  }
}

export default moviePageServiceOd;
