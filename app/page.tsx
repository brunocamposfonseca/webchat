"use client"
import ChatForm from "@/components/ChatForm";
import ChatMessage from "@/components/ChatMessage";
import { useEffect, useState } from "react";
import { socket } from "@/lib/socketClient";

export default function Home() {
  const [room, setRoom] = useState("");
  const [joinded, setJoined] = useState(false);
  const [messages, setMessages] = useState<
    { sender: string, message: string }[]
  >([]);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    socket.on("message", (data) =>{
      setMessages((prev) => [...prev, data]);
    })

    socket.on("user_joined", (message) =>{
      setMessages((prev) => [...prev, { sender: "system", message}]);
    })

    return () => {
      socket.off("user_joined");
      socket.off("message");
    }
  }, []);

  const handleSendMessage = (message: string) => {
    const data = { room, message, sender: userName };
    setMessages((prev) => [...prev, {sender: userName, message}]);
    socket.emit("message", data);
  }

  // const handleUserJoined = (message: string) => {
  //   setMessages((prev) => [...prev, {sender: "system", message}])
  //   console.log(message)
  // }

  const handleJoinRoom = () => {
    if(room && userName) {
      socket.emit("join-room", { room, username: userName });
      setJoined(true)
    }
  }

  return (
    <div className="flex mt-24 justify-center w-full">
      {!joinded ? (
        <div className="flex w-full max-w-3xl flex-col items-center">
          <h1 className="mb-4 text-2xl font-bold">Join a Room</h1>
          <input 
            type="text" 
            placeholder="Enter your username" 
            value={userName}
            className="w-64 px-4 py-2 mb-4 border-2 rounded-lg"
            onChange={(e) => setUserName(e.target.value)}
          />
          <input 
            type="text" 
            placeholder="Enter room name" 
            value={room}
            className="w-64 px-4 py-2 mb-4 border-2 rounded-lg"
            onChange={(e) => setRoom(e.target.value)}
          />
          <button 
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            onClick={handleJoinRoom}
          >
            Join Room
          </button>
        </div>
      ) : (
        <div className="w-full max-w-3xl mx-auto">
          <h1 className="mb-4 text-2xl font-bold">Room: 1</h1>
          <div className="h-[500px] overflow-y-auto p-4 mb-4 bg-gray-200 border-2 rounded-lg">
            {messages.map((msg, index) => (
              <ChatMessage
                key={index}
                sender={msg.sender}
                message={msg.message}
                isDwnMessage={msg.sender === userName}
              />
            ))}
          </div>
          <ChatForm onSendMessage={handleSendMessage} />
        </div>
      )}

    </div>
  );
}
