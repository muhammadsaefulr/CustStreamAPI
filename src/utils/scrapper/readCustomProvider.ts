import { load } from "cheerio";

class WebScraper {
  private static async fetchHtml(url: string): Promise<string> {
    const response = await fetch(url);
    return await response.text();
  }

  static async scrapeHomePage(url: string): Promise<any[]> {
    interface DataRes {
      title: string;
      url: string;
      imageUrl: string;
    }

    const html = await this.fetchHtml(url);
    const $ = load(html);
    let datas: DataRes[] = [];

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
    const html = await this.fetchHtml(url);
    const $ = load(html);
    let movie: any[] = [];

    $(".episodelist li").each((i, el) => {
      const movieList = {
        title: $(el).find("span a").text().trim(),
      };

      movie.push({ title: movieList.title });
    });

    return movie;
  }
}


export default WebScraper;