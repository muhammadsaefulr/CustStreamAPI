import WebScraper from "utils/scrapper/readCustomProvider";

class moviePageService {
    static async getHomePageMovieList(url: string) {

        let urlFetch = ""

        if(!url.includes("http://")){
            urlFetch += "http://" + url 
        } else if(!url.includes("https://")){
            urlFetch += "https://" + url
        }

        console.log(urlFetch)

        const data = await WebScraper.scrapeHomePage(urlFetch)

        console.log("data in service: ",data)

        return data
    }
}

export default moviePageService