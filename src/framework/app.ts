import express, { Request, Response } from "express";
import morgan from "morgan";
import dotenv from "dotenv"
import connectDB from "./config/db"
import userRouter from "./Routes/userAuth"




const app=express()

//env 
dotenv.config()


// port 
const PORT: string= process.env.PORT!  


//  same usage of bodyparser
app.use(express.json())
app.use(express.urlencoded({extended:true}))   



/// mongodb connect 
connectDB()


// morgan for using console all request
app.use(morgan('dev'))  

// user Router 
app.use("/",userRouter)  



app.listen(PORT,()=>console.log(`server running Port:http://localhost:${PORT}`))  


