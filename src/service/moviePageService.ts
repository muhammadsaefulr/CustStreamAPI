import WebScraper from "utils/scrapper/readCustomProvider";

class moviePageService {
  private static isValidUrl(url: string) {
    let urlFetch = "";

    if (!/^https?:\/\//.test(url)) {
      urlFetch = `http://${url}`;
    } else {
      urlFetch = url;
    }

    return urlFetch;
  }

  static async getHomePageMovieList(url: string) {
    const data = await WebScraper.scrapeHomePage(this.isValidUrl(url));

    return data;
  }

  static async getMovieEpisodeLists(url: string){
    const data = await WebScraper.scrapeMovieEpisodes(this.isValidUrl(url))

    return data;
  }

  static async getMovieVideoPlay(url: string){
    const data = await WebScraper.scrapeVideoMovieSource(this.isValidUrl(url))

    return data
  }

  static async getSearchMovieList(url: string) {
    const data = await WebScraper.scrapeSearchMovieByTitle(this.isValidUrl(url))

    return data
  }
}

export default moviePageService;
