import connectDB from "./framework/config/db"
import app from "./framework/config/app";
import { createServer } from 'http';
import soketConnection from "./framework/config/socket";
  
const PORT: string= process.env.PORT! 


const httpServer = createServer(app);




/// mongodb connect 
connectDB()

soketConnection(httpServer)
    



httpServer.listen(PORT,()=>console.log(`server running Port:http://localhost:${PORT}`))  