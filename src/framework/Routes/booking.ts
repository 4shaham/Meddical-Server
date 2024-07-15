import express ,{Router}from "express"


const router=express.Router()


import authorizationMiddleware from "../Middleware/user/authorization"


import BookingDb from "../model/BookingSchema"


import BookingController from "../../adapters/controllers/BookingController"
import BookingUseCase from "../../useCase/BookingUseCase"
import BookingRepository from "../../adapters/repositories/BookingRepository"


const bookingRepository=new BookingRepository(BookingDb)
const bookingUseCase=new BookingUseCase(bookingRepository)
const bookingController=new BookingController(bookingUseCase)




router.post("/createTokenBooking",authorizationMiddleware, bookingController.createTokenBooking.bind(bookingController))



export default router