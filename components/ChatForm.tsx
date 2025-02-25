"use client"

import React, { useState } from 'react'

const ChatForm = ({
  onSendMessage,
  disconnected
}: {
  onSendMessage: (message: string) => void
  disconnected: () => void
}) => {
  const [message, setMessage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(message.trim() !== ''){
      onSendMessage(message);
      setMessage('');
    };
  }

  return (
    <form 
      onSubmit={handleSubmit}
      className='flex gap-2 mt-4'
    >
        <input 
          type='text' 
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          className="flex-1 px-4 border-2 py-2 rounded-lg focus:outline-none"
          placeholder='Type your message here...'
        />
        <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg'>Send</button>
        <button onClick={disconnected} className='bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg'>Disconnect</button>

    </form>
  )
}

export default ChatForm