import connectDB from "./framework/config/db"
import app from "./framework/config/app";

  
const PORT: string= process.env.PORT! 


/// mongodb connect 
connectDB()



app.listen(PORT,()=>console.log(`server running Port:http://localhost:${PORT}`))  