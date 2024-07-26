import express,{Router} from "express"

const router=express.Router()


import ChatingControllers from "../../adapters/controllers/ChatingController"
import ChatingRepository from "../../adapters/repositories/ChatingRepository"
import ChatingUseCase from "../../useCase/ChatingUseCase"



// collection 
import Conversation from "../model/ConversationSchema"
import Message from "../model/MessageSchema"
import authorizationMiddleware from "../Middleware/user/authorization"
import authorization from "../Middleware/doctor/authorization"


const chatingRepository=new ChatingRepository(Conversation,Message)
const chatingUseCase=new ChatingUseCase(chatingRepository)
const chatingController=new ChatingControllers(chatingUseCase)



router.post("/createConversation",chatingController.createConversation.bind(chatingController))
router.get("/getConverasation",authorizationMiddleware,chatingController.getConversation.bind(chatingController))
router.get("/doctorGetConverasation",authorization,chatingController.doctorGetConversation.bind(chatingController))
router.post("/storeMessage",chatingController.createMessage.bind(chatingController))
router.get("/getMessage",chatingController.getMessage.bind(chatingController))

export default router



