
import { Server, Socket } from "socket.io";

export default function soketConnection(server:any){


    

    const io=new Server(server,{
        cors:{
            origin:"*", 
        },
    })
   
    console.log('hii,',io)

    io.on("connection",(socket:Socket)=>{
        console.log('hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii kiiiiiiiiiii')
        console.log("user coneceted")
    })


}
