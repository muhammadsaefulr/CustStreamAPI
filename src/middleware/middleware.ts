import { Hono, Next } from "hono";
import { HTTPException } from "hono/http-exception";

export async function errorHandler(error: Error) {
  if(error instanceof HTTPException){
    return error.getResponse()
  }
  return Response.json({error: `${error.message}`}, {status: 500})
}
