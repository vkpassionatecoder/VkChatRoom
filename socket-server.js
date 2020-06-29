const socketIO = require('socket.io');
const formatMessage = require("./utils/message");
const {userJoin,getUser,userDisconnect,getUsersByRoom} = require("./utils/users");

module.exports = (server)=>{
   let io = socketIO(server);
    const Admin = "Admin";
   io.on('connection',(socket)=>{
      console.log("New User Connected");

      //join users to a specific room
      socket.on('joinRoom',(data)=>{
         const user = userJoin(socket.id,data.username,data.room);
         console.log("user",user)
         socket.join(user.room);
         socket.emit("message",formatMessage(Admin,"Welcome to Vchat"));

         //Broadcast when a user connects
         socket.broadcast.to(user.room).emit('message',formatMessage(Admin,`${user.username} has joined the chat`));

         //send all users in a room
         io.to(user.room).emit("roomUsers",getUsersByRoom(user.room))
      })

      //send message in chat box
      socket.on("chatMessage",(msg)=>{
         const user = getUser(socket.id);
         let x = formatMessage(user.username,msg);
         console.log(x);
         io.to(user.room).emit("message",formatMessage(user.username,msg));
      })

      //Send message when a user disconnects 
      socket.on("disconnect",()=>{
         const user = userDisconnect(socket.id);

           if(user){
            io.to(user.room).emit("message",formatMessage(Admin,`${user.username} has left the chat`));
         //send all users in a room
         io.to(user.room).emit("roomUsers",getUsersByRoom(user.room))
           }
        
      })
   })
}