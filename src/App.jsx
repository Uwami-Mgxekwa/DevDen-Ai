import { useEffect, useRef, useState } from "react";

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [theme, setTheme] = useState("light");
  const [fontSize, setFontSize] = useState("base");
  const [reduceMotion, setReduceMotion] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const isDark = theme === "dark";
  const messagesEndRef = useRef(null);
  const MAX_MESSAGE_LEN = 600;

  const funnyResponses = [
    "Learn to follow instructions, smarty pants! 😏 Just type a language keyword like HTML, Java, or JavaScript.",
    "Uwami doesn't like it when people don't listen! 😤 Enter a programming language keyword only (e.g., HTML, Python, Java).",
    "Oops! I only understand language keywords. Try: HTML, CSS, JavaScript, Python, Java, C++, SQL, etc.",
    "Nice try! But I'm a simple bot—just give me a language name like 'Python' or 'React' and I'll tell you all about it! 😄",
    "Hey there! I only respond to programming language keywords. Type something like 'HTML' or 'Java' to get started!",
  ];

  const languageInfo = {
    html: {
      name: "HTML",
      description: "HyperText Markup Language is the standard markup language for creating web pages.",
      purpose: "HTML structures content on the web—headings, paragraphs, links, images, forms, and more. It's the skeleton of every website.",
      jobProspects: "High demand! Every web developer needs HTML. Entry-level positions start around $45k-$60k, with senior roles reaching $100k+. Essential for frontend, full-stack, and even backend developers who work with web APIs.",
      realLifeApplications: "Used in every website you visit—from simple blogs to complex web apps like Facebook, Google, and Amazon. Also used in email templates, documentation sites, and mobile app development frameworks.",
    },
    css: {
      name: "CSS",
      description: "Cascading Style Sheets is used to style and layout web pages.",
      purpose: "CSS controls the visual appearance of HTML elements—colors, fonts, spacing, layouts, animations, and responsive design.",
      jobProspects: "Excellent prospects! Combined with HTML/JavaScript, CSS skills are essential. Frontend developers earn $60k-$120k+. Specialized CSS experts (animations, responsive design) are highly sought after.",
      realLifeApplications: "Every website uses CSS for styling. Modern CSS powers animations on sites like Apple.com, responsive layouts on mobile apps, and design systems used by companies like Airbnb and Stripe.",
    },
    javascript: {
      name: "JavaScript",
      description: "A versatile programming language that runs in browsers and on servers (Node.js).",
      purpose: "JavaScript makes websites interactive—handling user clicks, form submissions, API calls, and dynamic content updates. Also powers server-side applications with Node.js.",
      jobProspects: "Extremely high demand! JavaScript developers are among the most sought-after. Salaries range from $70k (junior) to $150k+ (senior). React, Vue, and Node.js skills significantly boost earning potential.",
      realLifeApplications: "Used everywhere—Netflix, LinkedIn, PayPal, Uber (frontend), and many backend services. Powers interactive features on social media, e-commerce sites, and real-time applications like chat apps and gaming platforms.",
    },
    js: {
      name: "JavaScript",
      description: "A versatile programming language that runs in browsers and on servers (Node.js).",
      purpose: "JavaScript makes websites interactive—handling user clicks, form submissions, API calls, and dynamic content updates. Also powers server-side applications with Node.js.",
      jobProspects: "Extremely high demand! JavaScript developers are among the most sought-after. Salaries range from $70k (junior) to $150k+ (senior). React, Vue, and Node.js skills significantly boost earning potential.",
      realLifeApplications: "Used everywhere—Netflix, LinkedIn, PayPal, Uber (frontend), and many backend services. Powers interactive features on social media, e-commerce sites, and real-time applications like chat apps and gaming platforms.",
    },
    python: {
      name: "Python",
      description: "A high-level, interpreted programming language known for its simplicity and readability.",
      purpose: "Python is used for web development, data science, AI/ML, automation, scripting, and backend APIs. Its clean syntax makes it beginner-friendly yet powerful.",
      jobProspects: "Exceptional demand! Python developers earn $75k-$140k+. Data scientists and ML engineers using Python can earn $100k-$200k+. One of the fastest-growing languages in the job market.",
      realLifeApplications: "Powering Instagram's backend, YouTube's recommendation system, Google's search algorithms, NASA's data analysis, and countless AI/ML models. Used in finance, healthcare, automation, and scientific research.",
    },
    java: {
      name: "Java",
      description: "A robust, object-oriented programming language designed for cross-platform applications.",
      purpose: "Java is used for enterprise applications, Android app development, large-scale systems, banking software, and server-side applications. Known for 'write once, run anywhere' portability.",
      jobProspects: "Strong demand, especially in enterprise and Android development. Salaries range from $70k-$130k+. Java remains a staple in large corporations and financial institutions.",
      realLifeApplications: "Android apps (most apps on Google Play), enterprise systems at banks and insurance companies, e-commerce platforms like Amazon's backend, and large-scale web applications.",
    },
    "c++": {
      name: "C++",
      description: "A powerful, high-performance programming language used for system programming and resource-intensive applications.",
      purpose: "C++ is used for game engines, operating systems, embedded systems, high-frequency trading, graphics software, and applications requiring maximum performance.",
      jobProspects: "High demand in specialized fields! Game developers, systems programmers, and embedded engineers earn $80k-$150k+. Less common than web languages but highly valued in specific industries.",
      realLifeApplications: "Game engines (Unreal Engine, many AAA games), operating systems (Windows, Linux components), browsers (Chrome, Firefox), and performance-critical applications in finance and aerospace.",
    },
    "c#": {
      name: "C#",
      description: "A modern, object-oriented language developed by Microsoft, part of the .NET ecosystem.",
      purpose: "C# is used for Windows applications, game development (Unity), web APIs, enterprise software, and cross-platform mobile apps with Xamarin.",
      jobProspects: "Strong demand, especially in enterprise and game development. Salaries range from $70k-$130k+. Unity game developers are particularly sought after.",
      realLifeApplications: "Windows desktop applications, Unity games (Pokémon GO, many mobile games), enterprise software, and web services built on .NET. Used by companies like Microsoft, Stack Overflow, and many game studios.",
    },
    sql: {
      name: "SQL",
      description: "Structured Query Language is the standard language for managing and querying relational databases.",
      purpose: "SQL is used to create, read, update, and delete data in databases. Essential for data analysis, backend development, and database administration.",
      jobProspects: "Excellent prospects! Database administrators and data analysts earn $65k-$120k+. SQL is a must-have skill for backend developers and data scientists.",
      realLifeApplications: "Used by every major company to manage data—Amazon's product database, banks' transaction records, social media user data, and analytics platforms. Critical for data-driven decision making.",
    },
    react: {
      name: "React",
      description: "A popular JavaScript library for building user interfaces, developed by Facebook.",
      purpose: "React creates reusable UI components and manages application state. Used for building single-page applications, mobile apps (React Native), and interactive web interfaces.",
      jobProspects: "Very high demand! React developers are among the most sought-after frontend roles. Salaries range from $75k-$140k+. React Native adds mobile development opportunities.",
      realLifeApplications: "Used by Facebook, Instagram, Netflix, Airbnb, WhatsApp Web, and thousands of companies. Powers modern web applications and mobile apps through React Native.",
    },
    nodejs: {
      name: "Node.js",
      description: "A JavaScript runtime built on Chrome's V8 engine, allowing JavaScript to run on servers.",
      purpose: "Node.js enables server-side JavaScript development, building APIs, real-time applications, microservices, and full-stack JavaScript applications.",
      jobProspects: "High demand! Full-stack JavaScript developers (Node.js + React) are highly valued. Salaries range from $80k-$150k+. Essential for modern web development.",
      realLifeApplications: "Used by Netflix, LinkedIn, Uber, PayPal, and many startups. Powers real-time chat applications, streaming services, API backends, and serverless functions.",
    },
    php: {
      name: "PHP",
      description: "A server-side scripting language designed for web development.",
      purpose: "PHP is used to build dynamic websites, content management systems (like WordPress), e-commerce platforms, and server-side web applications.",
      jobProspects: "Steady demand, especially for WordPress and legacy systems. Salaries range from $60k-$110k+. Many established companies still use PHP.",
      realLifeApplications: "WordPress (powers 40%+ of websites), Facebook (originally built on PHP), Wikipedia, and many e-commerce platforms. Still widely used despite newer alternatives.",
    },
    ruby: {
      name: "Ruby",
      description: "A dynamic, object-oriented programming language known for its elegant syntax.",
      purpose: "Ruby is primarily used with Ruby on Rails framework for rapid web application development, building MVPs, and startup backends.",
      jobProspects: "Moderate demand, concentrated in startups and Rails-focused companies. Salaries range from $70k-$120k+. Smaller community but loyal following.",
      realLifeApplications: "Used by GitHub, Shopify, Airbnb (originally), Basecamp, and many startups. Rails enables rapid prototyping and building full-featured web applications quickly.",
    },
    go: {
      name: "Go (Golang)",
      description: "A statically typed language developed by Google, designed for simplicity and performance.",
      purpose: "Go is used for cloud services, microservices, distributed systems, DevOps tools, and high-performance backend services.",
      jobProspects: "Growing demand! Go developers are increasingly sought after, especially in cloud and infrastructure roles. Salaries range from $90k-$150k+.",
      realLifeApplications: "Used by Google (Kubernetes, Docker), Uber, Dropbox, Twitch, and many cloud-native applications. Popular for building scalable backend services and DevOps tools.",
    },
    rust: {
      name: "Rust",
      description: "A systems programming language focused on safety, performance, and concurrency.",
      purpose: "Rust is used for system programming, web assembly, blockchain development, game engines, and applications requiring memory safety without garbage collection.",
      jobProspects: "Emerging demand! Rust developers are niche but highly valued. Salaries range from $100k-$180k+. Growing rapidly in systems programming and blockchain.",
      realLifeApplications: "Used by Mozilla (Firefox components), Microsoft (Windows components), Dropbox, and blockchain projects. Growing adoption in game engines and WebAssembly applications.",
    },
    swift: {
      name: "Swift",
      description: "Apple's modern programming language for iOS, macOS, watchOS, and tvOS development.",
      purpose: "Swift is used to build native iOS and macOS applications, providing a safe, fast, and expressive language for Apple platforms.",
      jobProspects: "High demand for iOS developers! Swift developers earn $80k-$150k+. Mobile app development is booming, especially in iOS.",
      realLifeApplications: "Used to build all modern iOS apps—Instagram, Uber, Airbnb, and thousands of App Store applications. Essential for anyone developing for Apple devices.",
    },
    kotlin: {
      name: "Kotlin",
      description: "A modern, concise language that runs on the JVM, officially supported for Android development.",
      purpose: "Kotlin is primarily used for Android app development, though it can also be used for backend services and multiplatform projects.",
      jobProspects: "Strong demand! Android developers using Kotlin are highly sought after. Salaries range from $75k-$140k+. Google's official support makes it essential for Android.",
      realLifeApplications: "Used by Pinterest, Trello, Evernote, and many Android apps. Google's preferred language for Android development, replacing Java in many new projects.",
    },
  };

  const quickPrompts = ["HTML", "CSS", "JavaScript", "Python", "Java"];

  const getBotReply = (text) => {
    const normalized = text.trim().toLowerCase();
    const creatorKeywords = ["creator", "boss", "maker", "made you", "owner", "who built you"];

    // Creator check
    if (creatorKeywords.some((k) => normalized.includes(k))) {
      return "I'm created by Uwami Mgxekwa (https://brelinx.com).";
    }

    // Exact keyword match only
    const langKey = normalized;
    if (languageInfo[langKey]) {
      const info = languageInfo[langKey];
      return `${info.name} — ${info.description}\n\nWhat it's for:\n${info.purpose}\n\nJob Prospects:\n${info.jobProspects}\n\nReal-Life Applications:\n${info.realLifeApplications}`;
    }

    // Funny response for non-keywords
    const randomFunny = funnyResponses[Math.floor(Math.random() * funnyResponses.length)];
    return randomFunny;
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
              <p className="font-medium text-[var(--text-primary)]">Enter a programming language keyword</p>
              <p className="text-sm text-[var(--muted)]">
                Try: HTML, CSS, JavaScript, Python, Java, React, SQL, and more!
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
              placeholder="Enter a language keyword (e.g., HTML, Python, Java)..."
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
