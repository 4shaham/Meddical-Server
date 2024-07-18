import express,{Router} from "express"

const router=express.Router()


import ChatingControllers from "../../adapters/controllers/ChatingController"
import ChatingRepository from "../../adapters/repositories/ChatingRepository"
import ChatingUseCase from "../../useCase/ChatingUseCase"



const chatingRepository=new ChatingRepository()
const chatingUseCase=new ChatingUseCase(chatingRepository)
const chatingController=new ChatingControllers(chatingUseCase)



