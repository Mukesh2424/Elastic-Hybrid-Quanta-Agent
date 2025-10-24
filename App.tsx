
import React, { useState, useEffect, useRef } from 'react';
import { askAI } from './services/geminiService';
import { Message, Sender } from './types';
import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';
import Header from './components/Header';
import { v4 as uuidv4 } from 'uuid';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([
      {
        id: 'initial-ai-message',
        text: "Hello! I'm an AI search assistant powered by Elastic and Google Gemini. How can I help you today?",
        sender: Sender.AI,
      },
    ]);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (query: string) => {
    if (!query.trim() || isLoading) return;

    const userMessage: Message = { id: uuidv4(), text: query, sender: Sender.USER };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    
    // Add a temporary thinking message for better UX
    const thinkingMessageId = uuidv4();
    const thinkingMessage: Message = { id: thinkingMessageId, text: "...", sender: Sender.AI, isLoading: true };
    setMessages((prev) => [...prev, thinkingMessage]);

    try {
      const aiResponse = await askAI(query);
      const aiMessage: Message = { id: uuidv4(), text: aiResponse, sender: Sender.AI };
      
      setMessages((prev) => prev.map(msg => msg.id === thinkingMessageId ? aiMessage : msg));

    } catch (error) {
      console.error('Error fetching AI response:', error);
      const errorMessage: Message = {
        id: uuidv4(),
        text: 'Sorry, I encountered an error. Please try again.',
        sender: Sender.AI,
      };
      setMessages((prev) => prev.map(msg => msg.id === thinkingMessageId ? errorMessage : msg));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen text-white font-sans antialiased">
      <Header />
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
        <div ref={chatEndRef} />
      </div>
      <div className="p-4 bg-gray-900/80 backdrop-blur-sm border-t border-gray-700">
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default App;