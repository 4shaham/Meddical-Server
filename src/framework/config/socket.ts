
import { Server, Socket } from "socket.io";

export default function soketConnection(server:any){

    const io=new Server(server,{
        cors: {
            origin: "http://localhost:5173", 
        },
    })


    io.on("concection",(socket:Socket)=>{
        console.log("user coneceted")
    })


}
