import express, { Request, Response } from "express";
import morgan from "morgan";
import dotenv from "dotenv"
import cors from "cors"
import fileUpload from 'express-fileupload';

dotenv.config()  

import userRouter from "../Routes/userAuth"
import doctorAuthRouter from "../Routes/doctorAuth"
import adminRouter from "../Routes/admin"
import userGuestRouter from "../Routes/userGuestFetchData"
import doctorScheduleRouter from '../Routes/doctorSchedule'

import cookieParser from "cookie-parser";
import errorHandlerMiddleware from "../Middleware/globalErrorHandlingMiddleware";






const app=express()

//env 




//  set up cookieParser
app.use(cookieParser());


app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.use(fileUpload({
    useTempFiles:true,    
    limits: { fileSize: 2 * 1024 * 1024 },
  }))


//  same usage of bodyparser

app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({extended:true,limit: '10mb'})) 





// morgan for using console all request
app.use(morgan('dev'))  


// user Router 
app.use("/api",userRouter)  
app.use("/api",userGuestRouter)  
app.use("/api/doctor",doctorAuthRouter)
app.use("/api/doctor",doctorScheduleRouter)
app.use("/api/Admin/",adminRouter)


app.use(errorHandlerMiddleware)

export default app