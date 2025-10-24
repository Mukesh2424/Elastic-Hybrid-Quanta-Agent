
import React from 'react';
import { Message, Sender } from '../types';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.sender === Sender.USER;

  const thinkingBubble = (
    <div className="flex space-x-1.5">
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
    </div>
  );

  return (
    <div className={`flex items-end gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="w-8 h-8 bg-gradient-to-tr from-blue-500 to-purple-600 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-sm">
          AI
        </div>
      )}
      <div
        className={`max-w-md md:max-w-2xl px-4 py-3 rounded-2xl ${
          isUser
            ? 'bg-blue-600 text-white rounded-br-lg'
            : 'bg-gray-700 text-gray-200 rounded-bl-lg'
        }`}
      >
        {message.isLoading ? thinkingBubble : <p className="whitespace-pre-wrap">{message.text}</p>}
      </div>
    </div>
  );
};

export default ChatMessage;
