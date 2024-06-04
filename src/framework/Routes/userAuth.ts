import express, { Request, Response, Router } from "express"

const router:Router=express.Router()


router.post('/login',(req:Request,res:Response)=>{
      console.log(req.body)
      res.json('hiiiii')
})


export default router