import { useState } from "react";
import axios from "axios";

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const sendMessage = async () => {
    if (!input) return;

    const newMessage = { sender: "user", text: input };
    setMessages(prev => [...prev, newMessage]);
    setInput("");
    setTyping(true);

    try {
      const token = localStorage.getItem("token"); // JWT
      const res = await axios.post("http://localhost:3001/api/chat", { message: input }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const botMessage = { sender: "bot", text: res.data.reply };
      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      setMessages(prev => [...prev, { sender: "bot", text: "Error: Chat failed" }]);
    } finally {
      setTyping(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 w-80 bg-white shadow-lg rounded-xl p-4">
      <div className="h-64 overflow-y-auto border-b p-2">
        {messages.map((msg, i) => (
          <p key={i} className={msg.sender === "user" ? "text-right" : "text-left"}>
            <b>{msg.sender}:</b> {msg.text}
          </p>
        ))}
        {typing && <p className="italic text-gray-500">Bot is typing...</p>}
      </div>
      <div className="flex mt-2">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && sendMessage()}
          className="flex-grow border rounded px-2"
          placeholder="Type your message..."
        />
        <button onClick={sendMessage} className="ml-2 bg-blue-500 text-white px-3 rounded">
          Send
        </button>
      </div>
    </div>
  );
}
