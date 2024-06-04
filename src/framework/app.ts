import express, { Request, Response } from "express";


const app=express()

const port:number=4000





app.get('/',(req:Request,res:Response)=>{
        res.send('hiii')
}).listen(port,()=>console.log('server runing'))
