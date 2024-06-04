import express, { Request, Response } from "express";
import morgan from "morgan";

const app=express()

const port:number=4000




app.use(morgan('dev'))

app.get('/',(req:Request,res:Response)=>{
        res.send('hiii')
}).listen(port,()=>console.log('server runing'))
