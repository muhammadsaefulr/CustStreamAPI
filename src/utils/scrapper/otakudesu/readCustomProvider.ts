import { CheerioAPI, load } from "cheerio";

const url = "https://otakudesu.cloud/";
class WebScraperOtakudesu {
  private static async fetchHtml(url: string): Promise<string> {
    const response = await fetch(url);
    return await response.text();
  }

  private static async cheerioInstance(pathUri: string): Promise<CheerioAPI> {
    const html = await this.fetchHtml(url + pathUri);
    const datas = load(html);

    return datas;
  }

  static async scrapeHomePage(): Promise<any[]> {
    const $ = await this.cheerioInstance("");
    let datas: any[] = [];

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
        thumbnailUrl: anime.imageUrl,
        latestEp: anime.episode,
        updateAnime: anime.dayUpdate,
      });
    });

    return datas;
  }

  static async scrapeGenreAnimes(pathUri: string) {
    const $ = await this.cheerioInstance(pathUri);

    let AnimeList: any[] = [];

    $(".col-anime").each((i, el) => {
      const dataAnime = {
        animeTitle: $(el).find(".col-anime-title a").text().trim(),
        animeLinks: $(el).find(".col-anime-title a").attr("href"),
        animeStudio: $(el).find(".col-anime-studio").text().trim(),
        animeEpsAvailable: $(el).find(".col-anime-eps").text().trim(),
        animeRating: $(el).find(".col-anime-rating").text().trim(),
      };

      console.log(dataAnime)

      AnimeList.push(dataAnime);
    });

    return AnimeList.slice(0, 20);
  }

  static async scrapeAnimeEpisodes(
    pathUri: string
  ): Promise<{ AnimeInfo: any[]; AnimeEps: any[] }> {
    const $ = await this.cheerioInstance(pathUri);
    let AnimeInfo: any[] = [];
    let AnimeEps: any[] = [];

    $(".infozingle").each((i, el) => {
      const genres: any[] = $(el)
        .find('span b:contains("Genre")')
        .parent()
        .find("a")
        .map((i, e) => ({
          genre: $(e).text(),
          genreLinks: $(e).attr("href"),
        }))
        .get();

      const sinopsis = $(".sinopc").find("p").text();

      const dataDetails = {
        thumbnailImage: $(".fotoanime img").attr("src"),
        title: $(el).find('p:contains("Judul")').text().replace("Judul: ", ""),
        rating: $(el).find('p:contains("Skor")').text().replace("Skor: ", ""),
        producer: $(el)
          .find('p:contains("Produser")')
          .text()
          .replace("Produser: ", ""),
        status: $(el)
          .find('p:contains("Status")')
          .text()
          .replace("Status: ", ""),
        totalEps: $(el)
          .find('p:contains("Total Episode")')
          .text()
          .replace("Total Episode: ", ""),
        duration: $(el)
          .find('p:contains("Durasi")')
          .text()
          .replace("Durasi: ", "")
          .replace("per ep.", ""),
        studio: $(el)
          .find('p:contains("Studio:")')
          .text()
          .replace("Studio: ", ""),
        releaseDate: $(el).find('p:contains("Tanggal Rilis")').text(),
        genre: genres,
        sinopsis: sinopsis,
      };

      AnimeInfo.push(dataDetails);
    });

    $(".episodelist li").each((i, el) => {
      const AnimeList = {
        title: $(el).find("span a").text().trim(),
        vidLinks: $(el).find("span a").attr("href"),
      };

      AnimeEps.push(AnimeList);
    });

    return { AnimeInfo, AnimeEps };
  }

  static async scrapeSearchAnimeByTitle(pathUri: string): Promise<any[]> {
    const $ = await this.cheerioInstance(pathUri);
    const AnimeList: any[] = [];

    $("ul.chivsrc li").each((i, el) => {
      const genres: any[] = [];
      $(el)
        .find('.set b:contains("Genres")')
        .parent()
        .find("a")
        .each((i, genre) => {
          const data = {
            titleGenre: $(genre).text(),
            genreLinks: $(genre).attr("href"),
          };
          genres.push(data);
        });

      const resultList = {
        title: $(el).find("h2 a").text(),
        AnimeLinks: $(el).find("h2 a").attr("href"),
        AnimeThumbnail: $(el).find("img").attr("href"),
        status: $(el)
          .find(".set b:contains('Status')")
          .parent()
          .text()
          .trimStart(),
        rating: $(el).find(".set b:contains('Rating')").parent().text(),
      };

      AnimeList.push(...AnimeList, {
        title: resultList.title,
        AnimeLinks: resultList.AnimeLinks,
        genre: genres,
        status: resultList.status,
        rating: resultList.rating,
      });
    });

    return AnimeList.slice(0, 15);
  }

  static async scrapeVideoAnimeSource(pathUri: string): Promise<any> {
    const $ = await this.cheerioInstance(pathUri);
    let data = {};
    let AnimeSource: any[] = [];

    $(".download ul").each((i, el) => {
      $(el)
        .find("li")
        .each((i, el) => {
          const dataList: any[] = [];
          let titleRes = $(el).find("strong").text();

          $(el)
            .find("a")
            .each((i, el) => {
              let title = $(el).text();
              let links = $(el).attr("href");

              dataList.push({ title, links });
            });

          AnimeSource.push({ res: titleRes, dataList });
        });
    });

    $(".responsive-embed-stream").each(() => {
      const dataSource = {
        vidSourceLinks: $("iframe").attr("src"),
      };

      data = { sourceLinks: dataSource.vidSourceLinks, AnimeSource };
    });

    return data;
  }
}

export default WebScraperOtakudesu;
