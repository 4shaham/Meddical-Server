
import { Server, Socket } from "socket.io";

export default function soketConnection(server:any){

    const io=new Server(server,{
        cors:{
            origin:"*", 
        },
    })
   

    io.on("connection",(socket:Socket)=>{  
        console.log("user coneceted")
       
        socket.on('message', (data) => {
            console.log('Message received:', data);
            // // Optionally, send a response back to the client
            io.emit('message-content',data);
        });
        
        socket.on("disconnect",()=>{
             console.log("connection closed")
        })

    })

}
