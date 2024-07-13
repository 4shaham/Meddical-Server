import { NOTFOUND } from "dns";



export  enum StatusCode {
    internalServer=500,
    badRequest=400,
    success=200,
    unAuthorized=401,
    notFound=404
}