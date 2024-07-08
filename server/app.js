import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

// import jwt from 'jsonwebtoken'
// import cookieParser from "cookie-parser";
// const secretkeyJwt = "abcde";
const port = 3000;

const app = express();
const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: "https://chat-app-frontend-bv0n.onrender.com",
        methods: ["GET", "POST",],
        credentials: true
    }
});

app.use(
    cors( {
        origin: "https://chat-app-frontend-bv0n.onrender.com",
        methods: ["GET", "POST",],
        credentials: true,
    }
));

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.get("/", (req, res) => {
    res.send("Hello world");
});

// app.get("/login", (req, res) => {
//     const token = jwt.sign({ _id:'abcde'},secretkeyJwt)

//     res
//     .cookie("token",token,{httpOnly:true,secure:true,sameSite:"none"})
//     .json({
//         message:"Login Success"
//     })
    
// });

io.use((socket, next)=>{
    cookieParser()(socket.request,socket.request.res, (err)=>{
        if(err) return next(err);

        const token = socket.request.cookies.token;
        if(!token) return next(new Error("Authentication Error"));

        const decoded = jwt.verify(token, secretkeyJwt)
        next();
    })

})




io.on("connection", (socket) => {
    console.log("User connected ",socket.id);
 
     socket.on('message',({room, message})=>{
        console.log({room, message});
        socket.to(room).emit("receive-message",message,room)

     })

     socket.on("join-room",(room)=>{
        socket.join(room)
        console.log(`User:${socket.id} joined room ${room}`)
     })

    socket.on("disconnect", ()=>{
        console.log("User disconnected",socket.id)
    })
});

