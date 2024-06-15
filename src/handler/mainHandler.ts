import { Context } from "hono";
import mainService from "service/mainService/mainService";

class mainHandler {
  static pdrainExtractorHandler = async (c: Context) => {
    const queryUrl = c.req.query("q");

    if (!queryUrl) {
      return c.json({ message: "Query URL Is Null !" }, 404);
    }

    const responseData = await mainService.pdrainExtractorService(queryUrl);

    if (!responseData) {
      return c.json({ message: "Data Not Found !" }, 404);
    }

    return c.json({ message: "berhasil !", data: responseData });
  };
}

export default mainHandler
