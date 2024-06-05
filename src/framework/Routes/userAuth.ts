import express, { Request, Response, Router } from "express";

const router: Router = express.Router();

import UserAuthRepository from "./../../adapters/repositories/UserAuthRepository";
import UserAuthUseCase from "./../../useCase/UserAuthUseCase";
import UserAuthController from "./../../adapters/Controllers/UserAuthController";
import Users from "../model/UserSchema";

// create a object and connect all controllers and  usecase and useRepositorys
const userAuthRepository = new UserAuthRepository(Users);
const userAuthUseCase = new UserAuthUseCase(userAuthRepository);
const userAuthController = new UserAuthController(userAuthUseCase);

router.post("/login", userAuthController.login.bind(userAuthController));
router.post("/register", userAuthController.Register.bind(userAuthController));
router.post("verifyOtp",userAuthController.verifyOrp.bind(userAuthController))
export default router;
