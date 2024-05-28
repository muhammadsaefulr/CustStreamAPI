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
        updateAnime: anime.dayUpdate + ", " + anime.dateUpdate,
      });
    });

    return datas;
  }

  static async scrapeMovieEpisodes(pathUri: string): Promise<any[]> {
    const $ = await this.cheerioInstance(pathUri);
    let movie: any[] = [];

    $(".infozingle").each((i, el) => {
      const dataInfo: any[] = [];
      let sinopsisd = ""
      let genres: any[] = [];

      $(el)
        .find('span b:contains("Genre")')
        .parent()
        .find("a")
        .each((i, e) => {
          const genre = {
            genre: $(e).text(),
            genreLinks: $(e).attr("href"),
          };

          genres.push(genre);
        });

        $(".sinopc").each((i, el) => {
          const sinopsis = {
            desc: $(el).find("p").text(),
          };
    
          sinopsisd = sinopsis.desc
        });

      const dataDetails = {
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
          .find('p:contains("Studio")')
          .text()
          .replace("Studio: ", ""),
        genre: genres,
        sinopsis: sinopsisd
      };

      dataInfo.push(dataDetails);

      movie.push({ dataInfo });
    });

    $(".episodelist li").each((i, el) => {
      const movieList = {
        title: $(el).find("span a").text().trim(),
        vidLinks: $(el).find("span a").attr("href"),
      };

      movie.push({ title: movieList.title, vidSource: movieList.vidLinks });
    });

    return movie;
  }

  static async scrapeSearchMovieByTitle(pathUri: string): Promise<any[]> {
    const $ = await this.cheerioInstance(pathUri);
    const movieList: any[] = [];

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
        movieLinks: $(el).find("h2 a").attr("href"),
        movieThumbnail: $(el).find("img").attr("href"),
        status: $(el)
          .find(".set b:contains('Status')")
          .parent()
          .text()
          .trimStart(),
        rating: $(el).find(".set b:contains('Rating')").parent().text(),
      };

      movieList.push(...movieList, {
        title: resultList.title,
        movieLinks: resultList.movieLinks,
        genre: genres,
        status: resultList.status,
        rating: resultList.rating,
      });
    });

    return movieList;
  }

  static async scrapeVideoMovieSource(pathUri: string): Promise<any[]> {
    const $ = await this.cheerioInstance(pathUri);
    const movieSource: any[] = [];

    $(".download ul").each((i, el) => {
      $(el)
        .find("li")
        .each((i, el) => {
          const dataList: any[] = [];
          let title = $(el).find("strong").text();

          dataList.push({ resVid: title });

          $(el)
            .find("a")
            .each((i, el) => {
              let title = $(el).text();
              let links = $(el).attr("href");

              dataList.push({ link: links, title: title });
            });

          movieSource.push({ videoRepo: dataList });
        });
    });

    $(".responsive-embed-stream").each(() => {
      const dataSource = {
        vidSourceLinks: $("iframe").attr("src"),
      };

      movieSource.push({ sourceLinks: dataSource.vidSourceLinks });
    });

    return movieSource;
  }
}

export default WebScraperOtakudesu;
