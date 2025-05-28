import { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import Image from 'next/image';

export default function AskSurelockChat() {
  const [show, setShow] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'surelock', text: 'Hi! I’m Surelock. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { from: 'user', text: input }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/ask-surelock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      const reply = data.reply || "Sorry, I couldn’t understand that.";

      setMessages((prev) => [...prev, { from: 'surelock', text: reply }]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [...prev, { from: 'surelock', text: 'Something went wrong. Please try again later.' }]);
    }

    setLoading(false);
  };

  return (
    <>
      <button
        onClick={() => setShow(!show)}
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 bg-[#00205B] text-white font-bold text-sm px-4 py-2 rounded shadow z-[9999]"
      >
        {show ? 'Close Ask Surelock' : 'Ask Surelock'}
      </button>

      {show && (
        <div className="fixed bottom-10 right-10 bg-white border border-[#84BD00] rounded-lg shadow-lg w-[320px] h-[420px] flex flex-col z-[9999]">
          <div className="bg-[#00205B] text-white p-3 rounded-t-lg flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Image src="/ask-surelock-icon.png" alt="Surelock" width={24} height={24} className="rounded-full" />
              <span>Ask Surelock</span>
            </div>
            <button onClick={() => setShow(false)}>
              <X size={18} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`text-sm px-3 py-2 rounded-md max-w-[80%] ${
                  msg.from === 'surelock'
                    ? 'bg-[#F0F4F8] text-[#00205B] self-start'
                    : 'bg-green-100 text-[#00205B] self-end ml-auto'
                }`}
              >
                {msg.text}
              </div>
            ))}
            {loading && (
              <div className="text-sm px-3 py-2 rounded-md bg-[#F0F4F8] text-[#00205B] self-start">
                Surelock is typing...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 border-t border-gray-200">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your question..."
              className="w-full border rounded px-3 py-2 text-sm"
            />
          </div>
        </div>
      )}
    </>
  );
}
