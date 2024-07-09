import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

const port = 3000;

const app = express();
const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true
    }
});

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
}));

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.get("/", (req, res) => {
    res.send("Hello world");
});

// let onlineUsers = {};

io.on("connection", (socket) => {
    console.log("User connected ", socket.id);
    // onlineUsers[socket.id] = { id: socket.id };

    // io.emit("update-users", onlineUsers);

    socket.on('message', ({ room, message }) => {
        // const timestamp = new Date().toISOString();
        console.log({ room, message, timestamp });
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
        // delete onlineUsers[socket.id];
        // io.emit("update-users", onlineUsers);
    });
});
