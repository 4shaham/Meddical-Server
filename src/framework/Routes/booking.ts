import express ,{Router}from "express"


const router=express.Router()


import authorizationMiddleware from "../Middleware/user/authorization"


import BookingDb from "../model/BookingSchema"
import DoctorSchedule from "../model/DoctorScheduleSchema"

import BookingController from "../../adapters/controllers/BookingController"
import BookingUseCase from "../../useCase/BookingUseCase"
import BookingRepository from "../../adapters/repositories/BookingRepository"


const bookingRepository=new BookingRepository(BookingDb,DoctorSchedule)
const bookingUseCase=new BookingUseCase(bookingRepository)
const bookingController=new BookingController(bookingUseCase)




router.post("/createTokenBooking",authorizationMiddleware, bookingController.createTokenBooking.bind(bookingController))
router.delete("/cancelTokenBooking",authorizationMiddleware,bookingController.cancelTokenBooking.bind(bookingController))
router.get("/findBookingDataWithStatus",authorizationMiddleware,bookingController.findUserBooking.bind(bookingController))

export default router