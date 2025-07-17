import React, { useState } from "react";

const rules = [
  {
    keywords: ["fever", "temperature"],
    response: "🩺 Drink plenty of fluids, rest well, and monitor your temperature. If it stays high, consult a doctor.",
  },
  {
    keywords: ["weight", "fat", "obese"],
    response: "🏃 Try daily 30-minute walks and a balanced diet. Avoid sugary drinks.",
  },
  {
    keywords: ["diabetes", "sugar"],
    response: "🍽️ Eat fiber-rich foods, monitor blood sugar, and avoid processed snacks.",
  },
  {
    keywords: ["headache", "migraine"],
    response: "💆 Rest in a quiet room, stay hydrated, and avoid screen time.",
  },
  {
    keywords: ["exercise", "fitness"],
    response: "💪 Regular cardio and strength training help overall health. Start slow and be consistent.",
  },
  {
    keywords: ["hi","hello"],
    response: "Hi! Welcome to Smart Healthcare. How can I assist you today?",
  },
  {
    keywords: ["blood pressure","bp"],
    response:"To reduce blood pressure, try eating less salt, exercising regularly, and managing stress",
  },
  {
    keywords:["thyroid"],
    response:"The thyroid is a gland in your neck that controls metabolism. Thyroid issues can cause fatigue or weight changes.",
  },
  {
    keywords:["thank you"],
    response:"You're welcome! Stay healthy and take care.",
  },
  {
    keywords:["bye"],
    response:"Goodbye! Feel free to come back for health tips anytime.",
  },
];

const RuleBasedChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const getResponse = (inputText) => {
    const lowerInput = inputText.toLowerCase();
    for (const rule of rules) {
      if (rule.keywords.some((word) => lowerInput.includes(word))) {
        return rule.response;
      }
    }
    return "❓ Sorry, I don't have information on that. Try asking something else!";
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const userMessage = { sender: "user", text: input };
    const botMessage = { sender: "bot", text: getResponse(input) };
    setMessages((prev) => [...prev, userMessage, botMessage]);
    setInput("");
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-2xl mt-10 mb-10">
      <h2 className="text-2xl font-bold text-blue-800 mb-4">🤖 Health Chatbot</h2>
      <div className="h-64 overflow-y-auto border rounded-lg p-4 mb-4 bg-gray-50">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`mb-2 ${
              msg.sender === "user" ? "text-right text-blue-700" : "text-left text-green-700"
            }`}
          >
            <p><strong>{msg.sender === "user" ? "You" : "Bot"}:</strong> {msg.text}</p>
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          className="flex-1 px-4 py-2 border rounded-l-lg focus:outline-none"
          placeholder="Ask a health question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default RuleBasedChatbot;
