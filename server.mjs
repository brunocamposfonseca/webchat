import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = process.env.HOSTNAME || "localhost";
const port = parseInt(process.env.PORT || "3000", 10);

const app = next({ dev, hostname, port });

const handle = app.getRequestHandler();
app.prepare().then(() =>{
    const httpServer = createServer(handle);
    const io = new Server(httpServer);

    io.on("connection", (socket) => {
        console.log(`User connected: ${socket.id}`);

        socket.on("join-room", ({room, username}) => {
            socket.join(room);
            console.log(`${username} joined room: ${room}`);
            socket.to(room).emit("user_joined", `${username} joined the room `)
        });
        
        connectionStateRecovery: {
            socket.on("message", ({room, message, sender}) => {
                console.log(`Message from ${sender} in room ${room}: ${message}`);
                socket.to(room).emit("message", { sender, message });
            })
        }

        socket.on("user-disconn", ({ room, username }) => {
            console.log(`O usuário ${username} desconectou-se da sala: ${room}`);
            socket.to(room).emit("user-disconn", `${username} desconectou-se da sala.`);
            socket.leave(room);
            socket.emit("disconnect");
        });
        
    });

    io.on("disconnect", (socket) => {
        socket.disconnect();
    });
    

    httpServer.listen(port, () => {
        console.log(`Server on http://${hostname}:${port}`);
    })
})