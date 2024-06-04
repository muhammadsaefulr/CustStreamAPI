import axios from "axios";
import { load } from "cheerio";
import { promisify } from "util"

class MainService {
  static pdrainExtractorService(url: string): Promise<string | undefined> {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then((response) => response.text())
        .then((htmlData) => {
          const $ = load(htmlData);
          const dataRes = $('meta[name="twitter:player:stream"]').attr("content");
          console.log(dataRes);
          resolve(dataRes);
        })
        .catch((error) => {
          console.error("Error fetching the URL:", error);
          reject(error);
        });
    });
  }
  
}

export default MainService
export const pdrainExtractorServicePromise = promisify(MainService.pdrainExtractorService);