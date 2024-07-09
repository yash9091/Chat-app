import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

<<<<<<< HEAD
=======
// import jwt from 'jsonwebtoken'
// import cookieParser from "cookie-parser";
// const secretkeyJwt = "abcde";
>>>>>>> 4a1099722c671b93e82d3bbffc6e6207bc0ce04d
const port = 3000;

const app = express();
const server = createServer(app);

const io = new Server(server, {
    cors: {
<<<<<<< HEAD
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
=======
        origin: "https://chat-app-frontend-bv0n.onrender.com",
        methods: ["GET", "POST",],
>>>>>>> 4a1099722c671b93e82d3bbffc6e6207bc0ce04d
        credentials: true
    }
});

<<<<<<< HEAD
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
}));
=======
app.use(
    cors( {
        origin: "https://chat-app-frontend-bv0n.onrender.com",
        methods: ["GET", "POST",],
        credentials: true,
    }
));
>>>>>>> 4a1099722c671b93e82d3bbffc6e6207bc0ce04d

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.get("/", (req, res) => {
    res.send("Hello world");
});

<<<<<<< HEAD
=======
// app.get("/login", (req, res) => {
//     const token = jwt.sign({ _id:'abcde'},secretkeyJwt)

//     res
//     .cookie("token",token,{httpOnly:true,secure:true,sameSite:"none"})
//     .json({
//         message:"Login Success"
//     })
    
// });

// io.use((socket, next)=>{
//     cookieParser()(socket.request,socket.request.res, (err)=>{
//         if(err) return next(err);

//         const token = socket.request.cookies.token;
//         if(!token) return next(new Error("Authentication Error"));

//         const decoded = jwt.verify(token, secretkeyJwt)
//         next();
//     })

// })



>>>>>>> 4a1099722c671b93e82d3bbffc6e6207bc0ce04d

io.on("connection", (socket) => {
    console.log("User connected ", socket.id);


    socket.on('message', ({ room, message }) => {
        console.log({ room, message, });
        socket.to(room).emit("receive-message", {
            message,
            senderId: socket.id,
           
        });
    });

    socket.on("join-room", (room) => {
        socket.join(room);
        console.log(`User:${socket.id} joined room ${room}`);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected", socket.id);
       
    });
});
