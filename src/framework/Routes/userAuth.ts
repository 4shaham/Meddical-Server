import express, { Request, Response, Router } from "express"

const router:Router=express.Router()


import UserAuthRepository from './../../adapters/repositories/UserAuthRepository'
import UserAuthUseCase from './../../useCase/UserAuthUseCase'
import UserAuthController from './../../adapters/Controllers/UserAuthController'


// create a object and connect all controllers and  usecase and useRepositorys

const userAuthRepository = new UserAuthRepository()
const userAuthUseCase=new UserAuthUseCase(userAuthRepository)
const userAuthController=new UserAuthController(userAuthUseCase)


router.post('/login',userAuthController.login.bind(userAuthController))
router.post('/register',userAuthController.Register.bind(userAuthController))




export default router