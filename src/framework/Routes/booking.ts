import express ,{Router}from "express"


const router=express.Router()


import authorizationMiddleware from "../Middleware/user/authorization"
import isUserBlockedMiddleware from "../Middleware/user/isUserBlocked"

// models
import BookingDb from "../model/BookingSchema"
import DoctorSchedule from "../model/DoctorScheduleSchema"
import Payment from "../model/PaymentSchema"

import BookingController from "../../adapters/controllers/BookingController"
import BookingUseCase from "../../useCase/BookingUseCase"
import BookingRepository from "../../adapters/repositories/BookingRepository"


import StripePayment from "../utils/stripPayment"
import Conversation from "../model/ConversationSchema"

const stripePayment =new StripePayment()

const bookingRepository=new BookingRepository(BookingDb,DoctorSchedule,Payment,Conversation)
const bookingUseCase=new BookingUseCase(bookingRepository,stripePayment)
const bookingController=new BookingController(bookingUseCase)




router.post("/webhook",express.raw({type: 'application/json'}),bookingController.webhook.bind(bookingController))
router.delete("/cancelTokenBooking",authorizationMiddleware,bookingController.cancelTokenBooking.bind(bookingController))
router.get("/findBookingDataWithStatus",authorizationMiddleware,isUserBlockedMiddleware,bookingController.findUserBooking.bind(bookingController))
router.post("/payment",bookingController.makePayment.bind(bookingController))
router.put("/rescheduleBooking",authorizationMiddleware,isUserBlockedMiddleware,bookingController.rescheduleBooking.bind(bookingController))
// router.post("/webhook",bookingController.createTokenBooking.bind(bookingController))

export default router