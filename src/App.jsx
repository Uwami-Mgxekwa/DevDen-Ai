import { useEffect, useRef, useState } from "react";

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [theme, setTheme] = useState("light");
  const [fontSize, setFontSize] = useState("base");
  const [reduceMotion, setReduceMotion] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [datasetItems, setDatasetItems] = useState([]);
  const [datasetLoaded, setDatasetLoaded] = useState(false);
  const isDark = theme === "dark";
  const messagesEndRef = useRef(null);
  const MAX_MESSAGE_LEN = 600;
  const quickPrompts = [
    "Explain this code snippet",
    "Generate an HTML layout",
    "Fix this error",
    "Give me OOP basics",
    "Improve this function",
  ];
  const bannedWords = ["badword", "curse"];

  const findDatasetSnippet = (text) => {
    if (!datasetLoaded || !datasetItems.length) return "";
    const normalized = text.toLowerCase();
    const hit = datasetItems.find(
      (item) =>
        normalized.includes(item.language.toLowerCase()) ||
        normalized.includes(item.topic.toLowerCase()) ||
        normalized.includes(item.prompt.toLowerCase())
    );
    if (!hit) return "";
    return `${hit.language} (${hit.difficulty}) — ${hit.topic}\n${hit.ai_response}`;
  };

  const getBotReply = (text) => {
    const normalized = text.toLowerCase();
    const creatorKeywords = ["creator", "boss", "maker", "made you", "owner", "who built you"];
    const greetingKeywords = ["hi", "hello", "hey"];
    const wellbeingKeywords = ["how are you", "how are u", "how r u"];

    const datasetHit = findDatasetSnippet(normalized);
    if (datasetHit) return datasetHit;

    if (normalized.includes("system.out.println")) {
      return 'That line prints "hello world" to the console in Java using System.out.println.';
    }

    if (normalized.includes("explain") && (normalized.includes("code") || normalized.includes("snippet"))) {
      return "Paste the code plus the language/framework, and I'll summarize what it does and any obvious issues.";
    }

    if (normalized.includes("improve") && normalized.includes("function")) {
      return "Tell me the language and what the function should do—I'll refactor it for clarity, errors, and edge cases.";
    }

    if (normalized.includes("semantics")) {
      return "Semantic HTML uses tags like <header>, <nav>, <main>, <section>, <article>, <aside>, and <footer> to convey structure and meaning, improving accessibility and SEO.";
    }

    if (normalized === "code" || normalized.startsWith("code ")) {
      return "What language or framework is this for? Share a snippet or goal and I'll help.";
    }

    if (creatorKeywords.some((k) => normalized.includes(k))) {
      return "I'm created by Uwami Mgxekwa (https://brelinx.com).";
    }

    if (wellbeingKeywords.some((k) => normalized.includes(k))) {
      return "Doing great and ready to help with your code questions!";
    }

    if (greetingKeywords.some((k) => normalized === k || normalized.startsWith(`${k} `))) {
      return "Hi there! What can I help you build today?";
    }

    if (normalized.includes("oop") || normalized.includes("object oriented")) {
      return "OOP (object-oriented programming) organizes code into objects with data (state) and behavior (methods), using principles like encapsulation, inheritance, polymorphism, and abstraction.";
    }

    if (normalized.includes("html")) {
      return "Need HTML help? I can outline structure, semantics, or responsive patterns.";
    }

    if (normalized.includes("java")) {
      return "Java help? Tell me the topic—OOP, streams, Spring, or debugging.";
    }

    if (normalized.includes("javascript") || normalized.includes("js")) {
      return "JavaScript help? Ask about async, DOM, React patterns, or debugging.";
    }

    return `Got it: "${text}". Share a bit more detail or an example so I can help.`;
  };

  const parseBlocks = (messageText) => {
    const blocks = [];
    const codeRegex = /```(\w+)?\n([\s\S]*?)```/g;
    let lastIndex = 0;
    let match;

    while ((match = codeRegex.exec(messageText))) {
      if (match.index > lastIndex) {
        blocks.push({ type: "text", content: messageText.slice(lastIndex, match.index) });
      }
      blocks.push({ type: "code", lang: match[1] || "text", content: match[2].trim() });
      lastIndex = codeRegex.lastIndex;
    }

    if (lastIndex < messageText.length) {
      blocks.push({ type: "text", content: messageText.slice(lastIndex) });
    }

    return blocks;
  };

  const copyToClipboard = async (code) => {
    try {
      await navigator.clipboard.writeText(code);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  const renderMessage = (msg) => {
    const blocks = parseBlocks(msg.text || "");
    return blocks.map((block, idx) => {
      if (block.type === "code") {
        return (
          <div
            key={`${msg.id || idx}-code-${idx}`}
            className="mt-2 rounded-xl border border-[color:var(--panel-border)] bg-[var(--input-bg)] overflow-hidden"
          >
            <div className="flex items-center justify-between px-3 py-2 text-xs text-[var(--muted-strong)]">
              <span>{block.lang}</span>
              <button
                onClick={() => copyToClipboard(block.content)}
                className="text-[var(--accent)] hover:text-[var(--accent-strong)]"
              >
                Copy
              </button>
            </div>
            <pre className="overflow-auto text-sm px-3 py-2 text-[var(--text-primary)]">
              <code>{block.content}</code>
            </pre>
          </div>
        );
      }
      return (
        <p key={`${msg.id || idx}-text-${idx}`} className="leading-relaxed whitespace-pre-line">
          {block.content.trim()}
        </p>
      );
    });
  };

  const handleSend = () => {
    if (!input.trim()) return;
    if (input.length > MAX_MESSAGE_LEN) {
      setMessages((prev) => [
        ...prev,
        { id: Date.now(), text: "Message too long. Please keep it under 600 characters.", sender: "bot" },
      ]);
      setInput("");
      return;
    }

    const hasProfanity = bannedWords.some((w) => input.toLowerCase().includes(w));
    if (hasProfanity) {
      setMessages((prev) => [
        ...prev,
        { id: Date.now(), text: "Please keep the conversation respectful.", sender: "bot" },
      ]);
      setInput("");
      return;
    }

    const userText = input;
    const userId = Date.now();
    setMessages((prev) => [...prev, { id: userId, text: userText, sender: "user" }]);
    setInput("");

    const botReply = getBotReply(userText);
    streamBotReply(botReply);
  };

  const streamBotReply = (reply) => {
    setIsTyping(true);
    const botId = Date.now() + Math.random();
    let index = 0;
    setMessages((prev) => [...prev, { id: botId, text: "", sender: "bot" }]);

    const interval = setInterval(() => {
      index = Math.min(reply.length, index + Math.max(2, Math.ceil(reply.length / 40)));
      const nextText = reply.slice(0, index);
      setMessages((prev) =>
        prev.map((m) => (m.id === botId ? { ...m, text: nextText } : m))
      );
      if (index >= reply.length) {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, reduceMotion ? 0 : 25);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
  }, [messages, theme, reduceMotion]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    const stored = localStorage.getItem("devden-chat");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setMessages(parsed.messages ?? []);
        setTheme(parsed.theme ?? "light");
        setFontSize(parsed.fontSize ?? "base");
        setReduceMotion(parsed.reduceMotion ?? false);
      } catch (err) {
        console.error("Failed to load saved chat", err);
      }
    }
  }, []);

  useEffect(() => {
    const url = `${import.meta.env.BASE_URL}data/ai_coding_dataset_large.json`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setDatasetItems(Array.isArray(data) ? data : []);
        setDatasetLoaded(true);
      })
      .catch((err) => {
        console.error("Failed to load dataset", err);
        setDatasetItems([]);
        setDatasetLoaded(false);
      });
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "devden-chat",
      JSON.stringify({ messages, theme, fontSize, reduceMotion })
    );
  }, [messages, theme, fontSize, reduceMotion]);

  useEffect(() => {
    const sizeValue = fontSize === "small" ? "14px" : fontSize === "large" ? "18px" : "16px";
    document.documentElement.style.setProperty("--app-font-size", sizeValue);
  }, [fontSize]);

  useEffect(() => {
    if (reduceMotion) {
      document.documentElement.classList.add("reduce-motion");
    } else {
      document.documentElement.classList.remove("reduce-motion");
    }
  }, [reduceMotion]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const toggleSettings = () => setShowSettings((s) => !s);
  const clearChat = () => setMessages([]);

  return (
    <div
      className="min-h-screen flex items-center justify-center px-3 sm:px-6 py-4 text-[var(--text-primary)] bg-[var(--page-bg)]"
      style={{ fontSize: "var(--app-font-size)" }}
    >
      <div className="w-full max-w-[520px] sm:max-w-[640px] lg:max-w-[780px] h-[90vh] sm:h-[88vh] max-h-[960px] bg-[var(--panel-bg)] text-[var(--text-primary)] backdrop-blur-xl border border-[color:var(--panel-border)] shadow-[var(--panel-shadow)] rounded-3xl sm:rounded-[28px] flex flex-col overflow-hidden transition-colors duration-300">
        <header className="p-4 sm:p-5 border-b border-[color:var(--panel-border)] bg-[var(--panel-header)] flex items-start sm:items-center justify-between gap-3 flex-wrap">
          <div className="space-y-1">
            <p className="text-sm uppercase tracking-[0.2em] text-[var(--muted)]">Chat</p>
            <h1 className="text-xl font-semibold text-[var(--text-primary)]">DevDen Assistant</h1>
          </div>
          <div className="flex items-center gap-3 flex-wrap justify-end">
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
            <button
              onClick={toggleSettings}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-2xl border border-[color:var(--panel-border)] bg-[var(--chip-bg)] text-sm font-medium hover:border-[color:var(--accent-soft)] transition"
            >
              Settings
            </button>
            <button
              onClick={clearChat}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-2xl border border-[color:var(--panel-border)] bg-[var(--chip-bg)] text-sm font-medium hover:border-[color:var(--accent-soft)] transition"
            >
              Clear
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto space-y-3 p-4 sm:p-5 bg-[var(--panel-body)]">
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
            messages.map((msg, idx) => (
              <div
                key={msg.id ?? idx}
                className={`max-w-[90%] sm:max-w-[75%] rounded-2xl px-4 py-3 shadow-sm border ${
                  msg.sender === "user"
                    ? "ml-auto bg-[var(--user-bubble-bg)] text-[var(--user-bubble-text)] border-[color:var(--user-bubble-border)]"
                    : "mr-auto bg-[var(--bot-bubble-bg)] text-[var(--bot-bubble-text)] border-[color:var(--bot-bubble-border)]"
                }`}
              >
                {renderMessage(msg)}
              </div>
            ))
          )}
          {isTyping && (
            <div className="max-w-[60%] rounded-2xl px-4 py-3 border border-[color:var(--bot-bubble-border)] bg-[var(--bot-bubble-bg)] text-[var(--bot-bubble-text)] shadow-sm">
              <span className="inline-flex items-center gap-2 text-sm">
                <span className="h-2 w-2 rounded-full bg-[var(--accent)] animate-pulse" />
                brelinx is typing...
              </span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 sm:p-5 border-t border-[color:var(--panel-border)] bg-[var(--panel-footer)] backdrop-blur">
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 items-stretch sm:items-center">
            <input
              className="flex-1 bg-[var(--input-bg)] border border-[color:var(--input-border)] rounded-2xl px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything..."
            />
            <button
              onClick={handleSend}
              className="inline-flex items-center justify-center gap-2 bg-[var(--accent)] text-white px-4 py-3 rounded-2xl font-medium shadow-[0_8px_30px_var(--accent-shadow)] hover:bg-[var(--accent-strong)] active:translate-y-[1px] transition w-full sm:w-auto"
            >
              <span>Send</span>
              <span className="text-lg leading-none">↗</span>
            </button>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {quickPrompts.map((prompt) => (
              <button
                key={prompt}
                onClick={() => setInput(prompt)}
                className="px-3 py-2 rounded-full border border-[color:var(--panel-border)] bg-[var(--chip-bg)] text-xs text-[var(--muted-strong)] hover:border-[color:var(--accent-soft)]"
              >
                {prompt}
              </button>
            ))}
          </div>
          <div className="mt-3 flex items-center justify-center text-xs font-medium text-[var(--muted-strong)] gap-1">
            <span>Powered by</span>
            <a
              href="https://brelinx.com"
              target="_blank"
              rel="noreferrer"
              className="text-[var(--accent)] hover:text-[var(--accent-strong)] underline underline-offset-4"
              title="Visit brelinx.com"
            >
              brelinx.com
            </a>
          </div>
        </div>
      </div>

      {showSettings && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4">
          <div className="w-full max-w-md bg-[var(--panel-bg)] border border-[color:var(--panel-border)] rounded-3xl p-5 shadow-[var(--panel-shadow)] space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[var(--text-primary)]">Settings</h2>
              <button
                onClick={toggleSettings}
                className="text-[var(--muted-strong)] hover:text-[var(--text-primary)]"
              >
                Close
              </button>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[var(--muted-strong)]">Theme</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setTheme("light")}
                    className={`px-3 py-2 rounded-2xl border text-sm ${
                      theme === "light"
                        ? "border-[color:var(--accent-soft)] text-[var(--text-primary)]"
                        : "border-[color:var(--panel-border)] text-[var(--muted-strong)]"
                    }`}
                  >
                    Light
                  </button>
                  <button
                    onClick={() => setTheme("dark")}
                    className={`px-3 py-2 rounded-2xl border text-sm ${
                      theme === "dark"
                        ? "border-[color:var(--accent-soft)] text-[var(--text-primary)]"
                        : "border-[color:var(--panel-border)] text-[var(--muted-strong)]"
                    }`}
                  >
                    Dark
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[var(--muted-strong)]">Font size</span>
                <div className="flex gap-2">
                  {[
                    { key: "small", label: "Small" },
                    { key: "base", label: "Base" },
                    { key: "large", label: "Large" },
                  ].map((opt) => (
                    <button
                      key={opt.key}
                      onClick={() => setFontSize(opt.key)}
                      className={`px-3 py-2 rounded-2xl border text-sm ${
                        fontSize === opt.key
                          ? "border-[color:var(--accent-soft)] text-[var(--text-primary)]"
                          : "border-[color:var(--panel-border)] text-[var(--muted-strong)]"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[var(--muted-strong)]">Reduce motion</span>
                <label className="inline-flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={reduceMotion}
                    onChange={(e) => setReduceMotion(e.target.checked)}
                    className="accent-[var(--accent)]"
                  />
                  <span className="text-sm text-[var(--muted-strong)]">Minimize animations</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
