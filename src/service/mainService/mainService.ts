import axios from "axios";
import { load } from "cheerio";

class mainService {
  static pdrainExtractorServie = async (url: string) => {
    try {
      const response = await fetch(url);
      const htmlData = await response.text();

      const $ = load(htmlData);

      console.log(htmlData);

      const dataRes = $('meta[name="twitter:player:stream"]').attr("content");

      console.log("Video Source:", dataRes || "Not found");

      console.log(dataRes);

      return dataRes;
    } catch (error) {
      console.error("Error fetching the URL:", error);
    }
  };
}

export default mainService;
