import { useEffect, useState } from "react";

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [theme, setTheme] = useState("light");
  const isDark = theme === "dark";

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

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 text-[var(--text-primary)] bg-[var(--page-bg)]">
      <div className="w-full max-w-[460px] h-[90vh] bg-[var(--panel-bg)] text-[var(--text-primary)] backdrop-blur-xl border border-[color:var(--panel-border)] shadow-[var(--panel-shadow)] rounded-3xl flex flex-col overflow-hidden transition-colors duration-300">
        <header className="p-4 border-b border-[color:var(--panel-border)] bg-[var(--panel-header)] flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm uppercase tracking-[0.2em] text-[var(--muted)]">Chat</p>
            <h1 className="text-xl font-semibold text-[var(--text-primary)]">DevDen Assistant</h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-2xl border border-[color:var(--panel-border)] bg-[var(--chip-bg)] text-sm font-medium hover:border-[color:var(--accent-soft)] transition"
            >
              <span className="h-2.5 w-2.5 rounded-full bg-[var(--accent)] shadow-[0_0_0_6px_var(--accent-glow)]" />
              <span>{isDark ? "Dark" : "Light"} mode</span>
            </button>
            <div className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-[var(--chip-bg)] border border-[color:var(--panel-border)]">
              <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-[0_0_0_6px_rgba(16,185,129,0.18)]" />
              <span className="text-sm text-[var(--muted-strong)]">Online</span>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto space-y-3 p-4 bg-[var(--panel-body)]">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-[var(--muted-strong)]">
              <div className="h-12 w-12 rounded-2xl bg-[var(--text-primary)] text-[var(--panel-bg)] flex items-center justify-center text-lg font-semibold shadow-lg mb-3">
                AI
              </div>
              <p className="font-medium text-[var(--text-primary)]">Start a conversation</p>
              <p className="text-sm text-[var(--muted)]">
                Ask anything and get quick responses with a touch of green.
              </p>
            </div>
          ) : (
            messages.map((msg, i) => (
              <div
                key={i}
                className={`max-w-[80%] rounded-2xl px-4 py-3 shadow-sm border ${
                  msg.sender === "user"
                    ? "ml-auto bg-[var(--user-bubble-bg)] text-[var(--user-bubble-text)] border-[color:var(--user-bubble-border)]"
                    : "mr-auto bg-[var(--bot-bubble-bg)] text-[var(--bot-bubble-text)] border-[color:var(--bot-bubble-border)]"
                }`}
              >
                {msg.text}
              </div>
            ))
          )}
        </div>

        <div className="p-4 border-t border-[color:var(--panel-border)] bg-[var(--panel-footer)] backdrop-blur">
          <div className="flex gap-2 items-center">
            <input
              className="flex-1 bg-[var(--input-bg)] border border-[color:var(--input-border)] rounded-2xl px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything..."
            />
            <button
              onClick={handleSend}
              className="inline-flex items-center gap-2 bg-[var(--accent)] text-white px-4 py-3 rounded-2xl font-medium shadow-[0_8px_30px_var(--accent-shadow)] hover:bg-[var(--accent-strong)] active:translate-y-[1px] transition"
            >
              <span>Send</span>
              <span className="text-lg leading-none">↗</span>
            </button>
          </div>
          <div className="mt-3 flex items-center justify-center text-xs font-medium text-[var(--muted-strong)] gap-1">
            <span>Powered by</span>
            <a
              href="https://brelinx.com"
              target="_blank"
              rel="noreferrer"
              className="text-[var(--accent)] hover:text-[var(--accent-strong)] underline underline-offset-4"
            >
              brelinx.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
