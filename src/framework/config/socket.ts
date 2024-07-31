
import { Server, Socket } from "socket.io";

interface User {
    id:string;
    socketId:string;
}

export default function soketConnection(server:any){

    const io=new Server(server,{
        cors:{
            origin:"*", 
        },
    })
    
    let users:User[]=[]

    const addUser=(id:string,socketId:string)=>{
        !users.some(user=>user.id===id)&&users.push({id,socketId})
    }

    const removeUser=(socketId:string)=>{
       const filterd=users.filter(user=>user.socketId!=socketId)
       users=filterd
    }

    const getUser=(id:string):User|undefined=>{
    //    let data=users.find(user=>user.id == id)
    //    return data
    
       let data:string|null=null 

       for(let i=0;i<users.length;i++){
        console.log("shahafm");
        
            if(users[i].id==id){
                console.log("hii its matched");
                
                data=users[i].socketId
                return users[i]
            }
       }

       console.log(data,"djfjfk",users,id);
       
       if(data){
        return data
       }
    
    }

    io.on("connection",(socket:Socket)=>{  
        console.log("user coneceted")

        // take socketId and userId 

        socket.on("addUser",(id)=>{
            console.log(id,"looooooooooooooooooo");
            addUser(id,socket.id)
            io.emit('getUsers',users) 
        })

    
       
        socket.on('message',async(data,id) => {  
            console.log('Message received:',data,id);
            const user=await getUser(id) 
          
            
            if(!user){ return }
            console.log(user,"loooooo");
            io.to(user.socketId).emit('message-content',data);
        });
        
        socket.on("disconnect",()=>{
             console.log("connection closed")
             removeUser(socket.id)
             io.emit("lostUsers",users)
        })

    })

}
