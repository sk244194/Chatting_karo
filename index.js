const express = require('express')
const mongoose = require('mongoose')
const http = require('http')
const path = require('path');
const {Server} = require('socket.io');


const app = express();
const server = http.createServer(app);

const io = new Server(server);


app.use(express.static(path.resolve("./public")));
//Socket.io
io.on('connection', (socket) => {
    socket.on("socket-message",message => {
        io.emit('message',message);
        console.log("Client-message",message);
    });
    
    
    console.log("Socket Connected",socket.id);

    io.on('disconnect', () => {
    console.log('User disconnected: ' + socket.id);
  })
})

app.get('/',(req,res) => {
    res.sendFile(path.resolve("./public/home.html"))
})

server.listen(4000,() => {
    console.log('Server Started');
})