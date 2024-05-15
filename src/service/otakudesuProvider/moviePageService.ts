import WebScraperOtakudesu from "utils/scrapper/otakudesu/readCustomProvider";

const mainUrl = "https://otakudesu.cloud"
class moviePageServiceOd {

  static async getHomePageMovieListOd() {
    const data = await WebScraperOtakudesu.scrapeHomePage(mainUrl);

    return data;
  }

  static async getMovieEpisodeListsOd(url: string){
    const data = await WebScraperOtakudesu.scrapeMovieEpisodes(url)

    return data;
  }

  static async getMovieVideoPlayOd(url: string){
    const data = await WebScraperOtakudesu.scrapeVideoMovieSource(url)

    return data
  }

  static async getSearchMovieListOd(query: string) {
    const dataQuery = mainUrl + `?s=${query}&post_type=anime`
    const data = await WebScraperOtakudesu.scrapeSearchMovieByTitle(dataQuery)

    return data
  }
}

export default moviePageServiceOd;
