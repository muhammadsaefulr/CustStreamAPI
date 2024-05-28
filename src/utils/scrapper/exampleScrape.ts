import * as cheerio from "cheerio";

async function scrapeData() {
  try {
    const response = await fetch(
      "https://otakudesu.cloud/episode/kny-hgh-episode-1-sub-indo/"
    );
    const html = await response.text();

    const $ = cheerio.load(html);

    let datasource: any[] = [];
    $(".download").each((i, el) => {
      let title = $(el).find("h4").text().trim();

      datasource.push({ title: title });
      $(el)
        .find("ul")
        .each((i, el) => {
          $(el)
            .find("li")
            .each((i, el) => {
                let titleLinksHead = $(el).find("strong").text().trim()
                let titleLinks = $(el).find("a").text().trim()
                let titleSource = $(el).find("a").attr("href")

                datasource.push({header: titleLinksHead, title: titleLinks, source: titleSource})
            });
        });
      console.log(title);
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

// Panggil fungsi scrapeData
scrapeData();
