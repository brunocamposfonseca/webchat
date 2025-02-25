import React from 'react'

interface ChatMessageProps {
  sender: string;
  message: string;
  // time: string;
  isDwnMessage: boolean;
}

const ChatMessage = ( {sender, message, isDwnMessage}: ChatMessageProps ) => {
  const isSystemMessage = sender === 'system';
  return (
    <div className={`flex ${isSystemMessage ? 'justify-center' : isDwnMessage ? "justify-end" : "justify-start"} mb-3`}>
        <div className={`max-w-xs h-auto px-4 py-2 rounded-lg ${
          isSystemMessage 
          ? 'bg-gray-600 text-white text-center text-xs' 
          : isDwnMessage 
          ? "bg-blue-500 text-white" 
          : "bg-white text-black"
        }`}>
          {
          !isSystemMessage && <p className={`text-xs font-semibold max-w-full`}>{sender}<span className="ml-2 text-[10px] text-zinc-300">{new Date(Date.now()).getHours()}:{new Date(Date.now()).getMinutes()}</span></p>
          }
          <p className={`text-sm max-w-full h-auto text-clip`}>{message}</p>
        </div>
    </div>
  )
}

export default ChatMessage