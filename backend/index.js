const express = require('express')
const app = express()
const http=require('http');
const {Server}=require('socket.io');
const cors=require('cors');
const { Socket } = require('dgram');
const server=http.createServer(app);
app.use(cors());
const port = process.env.PORT || 5000

const io=new Server(server,{
    cors:{
        origin:'http://localhost:3000',
        methods:["GET","POST"],
    },
})



io.on('connection',(socket)=>{

     socket.on('joinroom',(data)=>{
        socket.join(data.roomid);
        console.log("joined");
     })

    console.log("New User Connected");
    socket.on('textfilled',(data)=>{
        socket.to(data.roomid).emit('broadcast',{textarea:data.textarea});
        console.log(data);
    })

})



server.listen(5000,()=>{
    console.log("Server is Running");
})

