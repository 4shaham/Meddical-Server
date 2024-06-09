

import connectDB from "./config/db"
import app from "./config/app";


const PORT: string= process.env.PORT!  

/// mongodb connect 
connectDB()

app.listen(PORT,()=>console.log(`server running Port:http://localhost:${PORT}`))  


    