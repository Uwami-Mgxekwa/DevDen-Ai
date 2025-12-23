import { useState } from "react";

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { text: input, sender: "user" }]);
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-emerald-50 text-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-[440px] h-[90vh] bg-white/80 backdrop-blur-xl border border-black/5 shadow-[0_15px_60px_rgba(0,0,0,0.12)] rounded-3xl flex flex-col overflow-hidden">
        <header className="p-4 border-b border-black/5 bg-white/70 flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-gray-500">Chat</p>
            <h1 className="text-xl font-semibold text-black">DevDen Assistant</h1>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-[0_0_0_6px_rgba(16,185,129,0.15)]" />
            <span className="text-sm text-gray-600">online</span>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto space-y-3 p-4">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-gray-500">
              <div className="h-12 w-12 rounded-2xl bg-black text-white flex items-center justify-center text-lg font-semibold shadow-lg mb-3">
                AI
              </div>
              <p className="font-medium text-black">Start a conversation</p>
              <p className="text-sm text-gray-500">
                Ask anything and get quick responses with a touch of green.
              </p>
            </div>
          ) : (
            messages.map((msg, i) => (
              <div
                key={i}
                className={`max-w-[80%] rounded-2xl px-4 py-3 shadow-sm ${
                  msg.sender === "user"
                    ? "ml-auto bg-black text-white border border-emerald-400/40"
                    : "mr-auto bg-white text-black border border-black/10"
                }`}
              >
                {msg.text}
              </div>
            ))
          )}
        </div>

        <div className="p-4 border-t border-black/5 bg-white/80 backdrop-blur">
          <div className="flex gap-2 items-center">
            <input
              className="flex-1 bg-gray-50 border border-black/10 rounded-2xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything..."
            />
            <button
              onClick={handleSend}
              className="inline-flex items-center gap-2 bg-emerald-500 text-white px-4 py-3 rounded-2xl font-medium shadow-[0_8px_30px_rgba(16,185,129,0.35)] hover:bg-emerald-600 active:translate-y-[1px] transition"
            >
              <span>Send</span>
              <span className="text-lg leading-none">↗</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
