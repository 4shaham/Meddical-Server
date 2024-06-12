import express, { Request, Response } from "express";
import morgan from "morgan";
import dotenv from "dotenv"
import cors from "cors"
import userRouter from "../Routes/userAuth"
import doctorAuthRouter from "../Routes/doctorAuth"
import cookieParser from "cookie-parser";





const app=express()

//env 
dotenv.config()




//  set up cookieParser
app.use(cookieParser());


app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))


//  same usage of bodyparser

app.use(express.json())
app.use(express.urlencoded({extended:true})) 




// morgan for using console all request
app.use(morgan('dev'))  


// user Router 
app.use("/api",userRouter)  
app.use("/api/doctor",doctorAuthRouter)

export default app