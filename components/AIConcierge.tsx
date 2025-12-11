import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';

const AIConcierge: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Bonjour. I am Eva, your personal stylist at Nevara. How may I assist you in finding the perfect piece today?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const response = await sendMessageToGemini(userMsg);
      setMessages(prev => [...prev, { role: 'model', text: response }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "I apologize, but I am momentarily unavailable.", isError: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
      {/* Chat Window */}
      <div 
        className={`bg-white shadow-2xl rounded-lg w-80 sm:w-96 mb-4 overflow-hidden transition-all duration-300 origin-bottom-right pointer-events-auto border border-stone-200 ${
          isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-10 pointer-events-none'
        }`}
        style={{ maxHeight: '500px', display: isOpen ? 'flex' : 'none', flexDirection: 'column' }}
      >
        {/* Header */}
        <div className="bg-stone-900 text-stone-50 p-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Sparkles size={18} className="text-gold-400" />
            <span className="font-serif font-medium tracking-wide">Eva - Stylist</span>
          </div>
          <button onClick={() => setIsOpen(false)} className="hover:text-gold-400 transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 bg-stone-50 h-80 space-y-4">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div 
                className={`max-w-[80%] p-3 rounded-lg text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-stone-900 text-white rounded-br-none' 
                    : 'bg-white border border-stone-200 text-stone-800 rounded-bl-none shadow-sm'
                } ${msg.isError ? 'border-red-300 bg-red-50 text-red-800' : ''}`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white border border-stone-200 p-3 rounded-lg rounded-bl-none shadow-sm">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-stone-400 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-stone-400 rounded-full animate-bounce delay-75"></span>
                  <span className="w-2 h-2 bg-stone-400 rounded-full animate-bounce delay-150"></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-3 bg-white border-t border-stone-100 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask for a recommendation..."
            className="flex-1 text-sm bg-stone-50 border border-stone-200 rounded-md px-3 py-2 focus:outline-none focus:border-gold-400 transition-colors"
          />
          <button 
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="p-2 bg-stone-900 text-white rounded-md hover:bg-stone-800 disabled:opacity-50 transition-colors"
          >
            <Send size={16} />
          </button>
        </div>
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="pointer-events-auto bg-stone-900 hover:bg-stone-800 text-white p-4 rounded-full shadow-lg transition-transform hover:scale-105 flex items-center justify-center group"
        aria-label="Open AI Stylist"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} className="group-hover:animate-pulse" />}
      </button>
    </div>
  );
};

export default AIConcierge;
