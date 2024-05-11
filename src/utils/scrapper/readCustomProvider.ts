import { CheerioAPI, load } from "cheerio";

class WebScraper {
  private static async fetchHtml(url: string): Promise<string> {
    const response = await fetch(url);
    return await response.text();
  }

  private static async cheerioInstance(url: string): Promise<CheerioAPI> {
    const html = await this.fetchHtml(url);
    const datas = load(html);

    return datas;
  }

  static async scrapeHomePage(url: string): Promise<DataTypesHomePage[]> {
    const $ = await this.cheerioInstance(url);
    let datas: DataTypesHomePage[] = [];

    $(".venz li").each((i, el) => {
      const anime = {
        episode: $(el).find(".epz").text().trim(),
        dayUpdate: $(el).find(".epztipe").text().trim(),
        dateUpdate: $(el).find(".newnime").text(),
        url: $(el).find(".thumb a").attr("href") || "",
        imageUrl: $(el).find(".thumb img").attr("src") || "",
        title: $(el).find(".jdlflm").text().trim(),
      };

      datas.push({
        title: anime.title,
        url: anime.url,
        imageUrl: anime.imageUrl,
      });
    });

    return datas;
  }

  static async scrapeMovieEpisodes(url: string): Promise<any[]> {
    const $ = await this.cheerioInstance(url);
    let movie: any[] = [];

    $(".episodelist li").each((i, el) => {
      const movieList = {
        title: $(el).find("span a").text().trim(),
        vidLinks: $(el).find("span a").attr("href"),
      };

      movie.push({ title: movieList.title, vidSource: movieList.vidLinks });
    });

    return movie;
  }

  static async scrapeSearchMovieByTitle(url: string): Promise<any[]> {
    const $ = await this.cheerioInstance(url);
    const movieList: any[] = [];

    $("ul.chivsrc li").each((i, el) => {
      const resultList = {
        title: $(el).find("h2 a").text(),
        movieLinks: $(el).find("h2 a").attr("href"),
      };

      movieList.push({
        title: resultList.title,
        movieLinks: resultList.movieLinks,
      });
    });

    return movieList;
  }

  static async scrapeVideoMovieSource(url: string): Promise<any[]> {
    const $ = await this.cheerioInstance(url);
    const movieSource: any[] = [];

    $(".responsive-embed-stream").each((i, el) => {
      const dataSource = {
        vidSourceLinks: $("iframe").attr("src"),
      };

      movieSource.push({ sourceLinks: dataSource.vidSourceLinks });
    });

    return movieSource;
  }
}

export default WebScraper;
