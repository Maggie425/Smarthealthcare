import React, { useState } from 'react';
import axios from 'axios';

const ChatbotPage = () => {
  const [input, setInput] = useState('');
  const [chat, setChat] = useState([]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setChat([...chat, { type: 'user', text: userMessage }]);
    setInput('');

    try {
      const res = await axios.post('http://localhost:5000/chat', { message: userMessage });
      setChat((prev) => [...prev, { type: 'bot', text: res.data.reply }]);
    } catch {
      setChat((prev) => [...prev, { type: 'bot', text: '⚠️ Error getting response' }]);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold text-blue-800 mb-4 text-center">💬 Smart Health Chatbot</h2>
      <div className="h-96 overflow-y-auto border border-gray-300 rounded-lg p-4 mb-4 bg-gray-50">
        {chat.map((c, i) => (
          <div key={i} className={`mb-2 ${c.type === 'user' ? 'text-right' : 'text-left'}`}>
            <span className="inline-block p-2 rounded-lg text-sm bg-blue-100 text-blue-900 max-w-xs">
              <b>{c.type === 'user' ? 'You' : 'Bot'}:</b> {c.text}
            </span>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Ask about health..."
          className="flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatbotPage;
