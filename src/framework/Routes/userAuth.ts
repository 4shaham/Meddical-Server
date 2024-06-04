import express, { Router } from "express"

const router:Router=express.Router()


router.get('/val',(req,res)=>{
     res.send('hii')
})


export default router