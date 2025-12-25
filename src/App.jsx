import { useEffect, useRef, useState } from "react";

// Icon Components
const WaveIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M7 12c0 2.76 2.24 5 5 5s5-2.24 5-5-2.24-5-5-5-5 2.24 5 5zm5-3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3z"/>
  </svg>
);

const ClockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"/>
  </svg>
);

const CalendarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
  </svg>
);

const TargetIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-8c0-2.76 2.24-5 5-5s5 2.24 5 5-2.24 5-5 5-5-2.24-5-5zm3 0c0 1.1.9 2 2 2s2-.9 2-2-.9-2-2-2-2 .9-2 2z"/>
  </svg>
);

const UserIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
  </svg>
);

const SmileIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9c.83 0 1.5-.67 1.5-1.5S7.83 8 7 8s-1.5.67-1.5 1.5S6.17 11 7 11zm10 0c.83 0 1.5-.67 1.5-1.5S17.83 8 17 8s-1.5.67-1.5 1.5.67 1.5 1.5 1.5zm-5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
  </svg>
);

const MicIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"/>
  </svg>
);

const RecordIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <circle cx="12" cy="12" r="8"/>
  </svg>
);

const DocumentIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
  </svg>
);

const SettingsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.82,11.69,4.82,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.43-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"/>
  </svg>
);

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
  </svg>
);

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [theme, setTheme] = useState("light");
  const [fontSize, setFontSize] = useState("base");
  const [reduceMotion, setReduceMotion] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [userName, setUserName] = useState("");
  const [awaitingName, setAwaitingName] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [learningGoals, setLearningGoals] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [lastActivity, setLastActivity] = useState(Date.now());
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [showPrompts, setShowPrompts] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [currentModel, setCurrentModel] = useState("basic");
  const [dailySearchCount, setDailySearchCount] = useState(0);
  const [lastSearchDate, setLastSearchDate] = useState(new Date().toDateString());
  const isDark = theme === "dark";
  const messagesEndRef = useRef(null);
  const MAX_MESSAGE_LEN = 600;

  // AI Models Configuration
  const aiModels = {
    basic: {
      name: "DevDen Basic",
      description: "Built-in programming language knowledge",
      icon: "🎯",
      color: "blue",
      searchEnabled: false,
      dailyLimit: null
    },
    explorer: {
      name: "DevDen Explorer",
      description: "Enhanced with web search (DuckDuckGo + Wikipedia)",
      icon: "🔍",
      color: "green",
      searchEnabled: true,
      dailyLimit: null
    },
    pro: {
      name: "DevDen Pro",
      description: "Premium search with Google (10 queries/day)",
      icon: "⚡",
      color: "purple",
      searchEnabled: true,
      dailyLimit: 10
    }
  };

  const funnyResponses = [
    "I can see you're trying to communicate, but I'm specifically designed to help with programming languages! Check out the quick prompts below or try typing a language name like HTML, Python, or JavaScript.",
    "Hmm, I didn't quite catch that! I specialize in programming languages. You can use the quick prompts below or type any programming language name to get started.",
    "I'm here to help you learn about programming languages! Take a look at the suggestions below or type a language name like React, Java, or CSS.",
    "Not sure what you're looking for? I'm your programming language expert! Try the quick prompts below or type any coding language you're curious about.",
    "I speak programming languages! Check out the quick prompts below or type something like Python, JavaScript, or HTML to learn more.",
  ];

  const languageInfo = {
    html: {
      name: "HTML",
      description: "HyperText Markup Language is the standard markup language for creating web pages.",
      purpose: "HTML structures content on the web—headings, paragraphs, links, images, forms, and more. It's the skeleton of every website.",
      jobProspects: "High demand! Every web developer needs HTML. Entry-level positions start around R37k-R50k per month, with senior roles reaching R83k+ per month. Essential for frontend, full-stack, and even backend developers who work with web APIs.",
      realLifeApplications: "Used in every website you visit—from simple blogs to complex web apps like Facebook, Google, and Amazon. Also used in email templates, documentation sites, and mobile app development frameworks.",
    },
    css: {
      name: "CSS",
      description: "Cascading Style Sheets is used to style and layout web pages.",
      purpose: "CSS controls the visual appearance of HTML elements—colors, fonts, spacing, layouts, animations, and responsive design.",
      jobProspects: "Excellent prospects! Combined with HTML/JavaScript, CSS skills are essential. Frontend developers earn R50k-R100k+ per month. Specialized CSS experts (animations, responsive design) are highly sought after.",
      realLifeApplications: "Every website uses CSS for styling. Modern CSS powers animations on sites like Apple.com, responsive layouts on mobile apps, and design systems used by companies like Airbnb and Stripe.",
    },
    javascript: {
      name: "JavaScript",
      description: "A versatile programming language that runs in browsers and on servers (Node.js).",
      purpose: "JavaScript makes websites interactive—handling user clicks, form submissions, API calls, and dynamic content updates. Also powers server-side applications with Node.js.",
      jobProspects: "Extremely high demand! JavaScript developers are among the most sought-after. Salaries range from R58k (junior) to R125k+ (senior) per month. React, Vue, and Node.js skills significantly boost earning potential.",
      realLifeApplications: "Used everywhere—Netflix, LinkedIn, PayPal, Uber (frontend), and many backend services. Powers interactive features on social media, e-commerce sites, and real-time applications like chat apps and gaming platforms.",
    },
    js: {
      name: "JavaScript",
      description: "A versatile programming language that runs in browsers and on servers (Node.js).",
      purpose: "JavaScript makes websites interactive—handling user clicks, form submissions, API calls, and dynamic content updates. Also powers server-side applications with Node.js.",
      jobProspects: "Extremely high demand! JavaScript developers are among the most sought-after. Salaries range from R58k (junior) to R125k+ (senior) per month. React, Vue, and Node.js skills significantly boost earning potential.",
      realLifeApplications: "Used everywhere—Netflix, LinkedIn, PayPal, Uber (frontend), and many backend services. Powers interactive features on social media, e-commerce sites, and real-time applications like chat apps and gaming platforms.",
    },
    python: {
      name: "Python",
      description: "A high-level, interpreted programming language known for its simplicity and readability.",
      purpose: "Python is used for web development, data science, AI/ML, automation, scripting, and backend APIs. Its clean syntax makes it beginner-friendly yet powerful.",
      jobProspects: "Exceptional demand! Python developers earn R62k-R117k+ per month. Data scientists and ML engineers using Python can earn R83k-R167k+ per month. One of the fastest-growing languages in the job market.",
      realLifeApplications: "Powering Instagram's backend, YouTube's recommendation system, Google's search algorithms, NASA's data analysis, and countless AI/ML models. Used in finance, healthcare, automation, and scientific research.",
    },
    java: {
      name: "Java",
      description: "A robust, object-oriented programming language designed for cross-platform applications.",
      purpose: "Java is used for enterprise applications, Android app development, large-scale systems, banking software, and server-side applications. Known for 'write once, run anywhere' portability.",
      jobProspects: "Strong demand, especially in enterprise and Android development. Salaries range from R58k-R108k+ per month. Java remains a staple in large corporations and financial institutions.",
      realLifeApplications: "Android apps (most apps on Google Play), enterprise systems at banks and insurance companies, e-commerce platforms like Amazon's backend, and large-scale web applications.",
    },
    "c++": {
      name: "C++",
      description: "A powerful, high-performance programming language used for system programming and resource-intensive applications.",
      purpose: "C++ is used for game engines, operating systems, embedded systems, high-frequency trading, graphics software, and applications requiring maximum performance.",
      jobProspects: "High demand in specialized fields! Game developers, systems programmers, and embedded engineers earn R67k-R125k+ per month. Less common than web languages but highly valued in specific industries.",
      realLifeApplications: "Game engines (Unreal Engine, many AAA games), operating systems (Windows, Linux components), browsers (Chrome, Firefox), and performance-critical applications in finance and aerospace.",
    },
    "c#": {
      name: "C#",
      description: "A modern, object-oriented language developed by Microsoft, part of the .NET ecosystem.",
      purpose: "C# is used for Windows applications, game development (Unity), web APIs, enterprise software, and cross-platform mobile apps with Xamarin.",
      jobProspects: "Strong demand, especially in enterprise and game development. Salaries range from R58k-R108k+ per month. Unity game developers are particularly sought after.",
      realLifeApplications: "Windows desktop applications, Unity games (Pokémon GO, many mobile games), enterprise software, and web services built on .NET. Used by companies like Microsoft, Stack Overflow, and many game studios.",
    },
    sql: {
      name: "SQL",
      description: "Structured Query Language is the standard language for managing and querying relational databases.",
      purpose: "SQL is used to create, read, update, and delete data in databases. Essential for data analysis, backend development, and database administration.",
      jobProspects: "Excellent prospects! Database administrators and data analysts earn R54k-R100k+ per month. SQL is a must-have skill for backend developers and data scientists.",
      realLifeApplications: "Used by every major company to manage data—Amazon's product database, banks' transaction records, social media user data, and analytics platforms. Critical for data-driven decision making.",
    },
    react: {
      name: "React",
      description: "A popular JavaScript library for building user interfaces, developed by Facebook.",
      purpose: "React creates reusable UI components and manages application state. Used for building single-page applications, mobile apps (React Native), and interactive web interfaces.",
      jobProspects: "Very high demand! React developers are among the most sought-after frontend roles. Salaries range from R62k-R117k+ per month. React Native adds mobile development opportunities.",
      realLifeApplications: "Used by Facebook, Instagram, Netflix, Airbnb, WhatsApp Web, and thousands of companies. Powers modern web applications and mobile apps through React Native.",
    },
    nodejs: {
      name: "Node.js",
      description: "A JavaScript runtime built on Chrome's V8 engine, allowing JavaScript to run on servers.",
      purpose: "Node.js enables server-side JavaScript development, building APIs, real-time applications, microservices, and full-stack JavaScript applications.",
      jobProspects: "High demand! Full-stack JavaScript developers (Node.js + React) are highly valued. Salaries range from R67k-R125k+ per month. Essential for modern web development.",
      realLifeApplications: "Used by Netflix, LinkedIn, Uber, PayPal, and many startups. Powers real-time chat applications, streaming services, API backends, and serverless functions.",
    },
    php: {
      name: "PHP",
      description: "A server-side scripting language designed for web development.",
      purpose: "PHP is used to build dynamic websites, content management systems (like WordPress), e-commerce platforms, and server-side web applications.",
      jobProspects: "Steady demand, especially for WordPress and legacy systems. Salaries range from R50k-R92k+ per month. Many established companies still use PHP.",
      realLifeApplications: "WordPress (powers 40%+ of websites), Facebook (originally built on PHP), Wikipedia, and many e-commerce platforms. Still widely used despite newer alternatives.",
    },
    ruby: {
      name: "Ruby",
      description: "A dynamic, object-oriented programming language known for its elegant syntax.",
      purpose: "Ruby is primarily used with Ruby on Rails framework for rapid web application development, building MVPs, and startup backends.",
      jobProspects: "Moderate demand, concentrated in startups and Rails-focused companies. Salaries range from R58k-R100k+ per month. Smaller community but loyal following.",
      realLifeApplications: "Used by GitHub, Shopify, Airbnb (originally), Basecamp, and many startups. Rails enables rapid prototyping and building full-featured web applications quickly.",
    },
    go: {
      name: "Go (Golang)",
      description: "A statically typed language developed by Google, designed for simplicity and performance.",
      purpose: "Go is used for cloud services, microservices, distributed systems, DevOps tools, and high-performance backend services.",
      jobProspects: "Growing demand! Go developers are increasingly sought after, especially in cloud and infrastructure roles. Salaries range from R75k-R125k+ per month.",
      realLifeApplications: "Used by Google (Kubernetes, Docker), Uber, Dropbox, Twitch, and many cloud-native applications. Popular for building scalable backend services and DevOps tools.",
    },
    rust: {
      name: "Rust",
      description: "A systems programming language focused on safety, performance, and concurrency.",
      purpose: "Rust is used for system programming, web assembly, blockchain development, game engines, and applications requiring memory safety without garbage collection.",
      jobProspects: "Emerging demand! Rust developers are niche but highly valued. Salaries range from R83k-R150k+ per month. Growing rapidly in systems programming and blockchain.",
      realLifeApplications: "Used by Mozilla (Firefox components), Microsoft (Windows components), Dropbox, and blockchain projects. Growing adoption in game engines and WebAssembly applications.",
    },
    swift: {
      name: "Swift",
      description: "Apple's modern programming language for iOS, macOS, watchOS, and tvOS development.",
      purpose: "Swift is used to build native iOS and macOS applications, providing a safe, fast, and expressive language for Apple platforms.",
      jobProspects: "High demand for iOS developers! Swift developers earn R67k-R125k+ per month. Mobile app development is booming, especially in iOS.",
      realLifeApplications: "Used to build all modern iOS apps—Instagram, Uber, Airbnb, and thousands of App Store applications. Essential for anyone developing for Apple devices.",
    },
    kotlin: {
      name: "Kotlin",
      description: "A modern, concise language that runs on the JVM, officially supported for Android development.",
      purpose: "Kotlin is primarily used for Android app development, though it can also be used for backend services and multiplatform projects.",
      jobProspects: "Strong demand! Android developers using Kotlin are highly sought after. Salaries range from R62k-R117k+ per month. Google's official support makes it essential for Android.",
      realLifeApplications: "Used by Pinterest, Trello, Evernote, and many Android apps. Google's preferred language for Android development, replacing Java in many new projects.",
    },
    c: {
      name: "C",
      description: "A foundational systems programming language that has influenced many modern languages.",
      purpose: "C is used for system programming, embedded systems, operating systems, compilers, and performance-critical applications where low-level control is needed.",
      jobProspects: "Steady demand in systems programming and embedded development. Salaries range from R58k-R108k+ per month. Essential for firmware, drivers, and system-level programming.",
      realLifeApplications: "Used in Linux kernel, embedded systems in cars and IoT devices, microcontrollers, and as the foundation for many other programming languages and systems.",
    },
    typescript: {
      name: "TypeScript",
      description: "A typed superset of JavaScript that compiles to plain JavaScript, developed by Microsoft.",
      purpose: "TypeScript adds static typing to JavaScript, making large codebases more maintainable and catching errors at compile time. Used for web apps, Node.js backends, and enterprise applications.",
      jobProspects: "Very high demand! TypeScript developers are increasingly sought after. Salaries range from R67k-R125k+ per month. Many companies are migrating from JavaScript to TypeScript.",
      realLifeApplications: "Used by Microsoft, Slack, Airbnb, and many enterprise applications. Powers large-scale web applications where type safety and maintainability are crucial.",
    },
    perl: {
      name: "Perl",
      description: "A high-level programming language known for its text processing capabilities and regular expressions.",
      purpose: "Perl excels at text processing, system administration, web development, bioinformatics, and quick scripting tasks. Known for its 'there's more than one way to do it' philosophy.",
      jobProspects: "Moderate demand, mainly in legacy systems and specialized fields like bioinformatics. Salaries range from R70k-R120k+. Still valued for text processing and system administration.",
      realLifeApplications: "Used in bioinformatics research, system administration scripts, legacy web applications, and text processing pipelines in various industries.",
    },
    scala: {
      name: "Scala",
      description: "A JVM language that combines functional and object-oriented programming paradigms.",
      purpose: "Scala is used for big data processing (Apache Spark), distributed systems, web backends, and applications requiring both functional and OOP approaches.",
      jobProspects: "Good demand in big data and fintech. Salaries range from R90k-R160k+. Particularly valued in companies using Apache Spark and functional programming.",
      realLifeApplications: "Used by Twitter, LinkedIn, Netflix for big data processing, Apache Spark ecosystem, and financial systems requiring high performance and concurrency.",
    },
    r: {
      name: "R",
      description: "A programming language and environment specifically designed for statistical computing and data analysis.",
      purpose: "R is used for statistical analysis, data visualization, machine learning, bioinformatics, and academic research. Excellent for data science and statistical modeling.",
      jobProspects: "Strong demand in data science and research. Data scientists using R earn R67k-R117k+ per month. Particularly valued in academia, pharmaceuticals, and research institutions.",
      realLifeApplications: "Used by statisticians, data scientists, researchers in pharmaceuticals, finance, and academia. Powers statistical analysis in clinical trials and market research.",
    },
    matlab: {
      name: "MATLAB",
      description: "A programming platform designed for engineering and scientific computing with built-in mathematical functions.",
      purpose: "MATLAB is used for numerical computing, algorithm development, data analysis, visualization, and simulation in engineering and scientific fields.",
      jobProspects: "Steady demand in engineering and research. Engineers using MATLAB earn R75k-R130k+. Essential in aerospace, automotive, and academic research.",
      realLifeApplications: "Used by NASA, automotive companies for simulation, signal processing in telecommunications, and research institutions for mathematical modeling and analysis.",
    },
    haskell: {
      name: "Haskell",
      description: "A purely functional programming language with strong static typing and lazy evaluation.",
      purpose: "Haskell is used for academic research, financial systems, compilers, and applications requiring mathematical precision and functional programming paradigms.",
      jobProspects: "Niche but well-paid demand. Haskell developers earn R90k-R160k+. Valued in fintech, academia, and companies emphasizing functional programming.",
      realLifeApplications: "Used in financial systems, blockchain projects, compilers, and academic research. Companies like Facebook use Haskell for spam detection systems.",
    },
    dart: {
      name: "Dart",
      description: "A programming language developed by Google, primarily used with the Flutter framework for mobile app development.",
      purpose: "Dart is mainly used with Flutter to build cross-platform mobile applications for iOS and Android from a single codebase.",
      jobProspects: "Growing demand with Flutter's popularity! Dart/Flutter developers earn R70k-R130k+. Increasing adoption for cross-platform mobile development.",
      realLifeApplications: "Used by Google Ads, Alibaba, BMW, and many mobile apps. Powers cross-platform mobile applications that run on both iOS and Android.",
    },
    elixir: {
      name: "Elixir",
      description: "A functional programming language built on the Erlang Virtual Machine, designed for scalable and fault-tolerant systems.",
      purpose: "Elixir is used for building distributed, concurrent, and fault-tolerant systems like web applications, IoT backends, and real-time communication systems.",
      jobProspects: "Growing demand in startups and companies needing scalable systems. Elixir developers earn R80k-R140k+. Valued for building resilient, concurrent applications.",
      realLifeApplications: "Used by Discord, Pinterest, Moz, and WhatsApp (Erlang). Powers real-time chat systems, IoT platforms, and high-concurrency web applications.",
    },
    "objective-c": {
      name: "Objective-C",
      description: "Apple's older programming language for iOS and macOS development, now largely superseded by Swift.",
      purpose: "Objective-C was used for iOS and macOS app development. Still maintained in legacy applications and some system-level programming on Apple platforms.",
      jobProspects: "Declining demand as Swift takes over. Legacy Objective-C developers earn R70k-R120k+. Mainly needed for maintaining existing iOS/macOS applications.",
      realLifeApplications: "Used in older iOS apps, macOS applications, and legacy codebases. Many established apps still have Objective-C components being gradually migrated to Swift.",
    },
    lua: {
      name: "Lua",
      description: "A lightweight, embeddable scripting language designed for extending applications.",
      purpose: "Lua is used for game scripting, embedded systems, web development (OpenResty), and as an extension language in various applications.",
      jobProspects: "Moderate demand, mainly in gaming and embedded systems. Lua developers earn R60k-R110k+. Valued for game development and embedded scripting.",
      realLifeApplications: "Used in World of Warcraft addons, game engines, Redis scripting, network appliances, and as a scripting language in various software applications.",
    },
    fortran: {
      name: "Fortran",
      description: "One of the oldest programming languages, still widely used in scientific and high-performance computing.",
      purpose: "Fortran is used for numerical computing, scientific simulations, weather forecasting, and high-performance computing applications requiring mathematical precision.",
      jobProspects: "Steady demand in scientific computing and HPC. Fortran developers earn R80k-R140k+. Essential in aerospace, weather modeling, and scientific research.",
      realLifeApplications: "Used by NASA, weather services, climate modeling, nuclear simulations, and supercomputing applications. Still dominant in scientific computing.",
    },
    ada: {
      name: "Ada",
      description: "A structured programming language designed for safety-critical and defense systems.",
      purpose: "Ada is used in defense systems, aerospace, air traffic control, medical devices, and other safety-critical applications requiring high reliability.",
      jobProspects: "Specialized demand in defense and safety-critical systems. Ada developers earn R90k-R150k+. Essential for government and aerospace contractors.",
      realLifeApplications: "Used in military systems, air traffic control, spacecraft software, medical devices, and railway systems where safety and reliability are paramount.",
    },
    lisp: {
      name: "Lisp",
      description: "One of the oldest programming languages, known for its symbolic computation and AI research applications.",
      purpose: "Lisp is used in AI research, symbolic computation, academic research, and applications requiring dynamic code manipulation and symbolic processing.",
      jobProspects: "Niche demand in AI research and specialized applications. Lisp developers earn R80k-R140k+. Valued in academia and AI research institutions.",
      realLifeApplications: "Used in AI research, computer algebra systems, CAD software, and academic research. Influenced many modern languages and programming concepts.",
    },
    prolog: {
      name: "Prolog",
      description: "A logic programming language used for artificial intelligence and computational linguistics.",
      purpose: "Prolog is used for AI applications, expert systems, natural language processing, and problems involving logical reasoning and knowledge representation.",
      jobProspects: "Specialized demand in AI and expert systems. Prolog developers earn R70k-R130k+. Valued in academic research and specialized AI applications.",
      realLifeApplications: "Used in expert systems, natural language processing, AI research, and applications requiring logical inference and knowledge-based reasoning.",
    },
    erlang: {
      name: "Erlang",
      description: "A programming language designed for building distributed, fault-tolerant, and concurrent systems.",
      purpose: "Erlang is used for telecommunications, distributed systems, real-time applications, and systems requiring high availability and fault tolerance.",
      jobProspects: "Steady demand in telecom and distributed systems. Erlang developers earn R90k-R150k+. Valued for building highly concurrent and fault-tolerant systems.",
      realLifeApplications: "Used by WhatsApp, Ericsson telecom equipment, RabbitMQ message broker, and systems requiring 99.9% uptime and massive concurrency.",
    },
    graphql: {
      name: "GraphQL",
      description: "A query language and runtime for APIs that allows clients to request exactly the data they need.",
      purpose: "GraphQL is used for building flexible APIs, reducing over-fetching of data, and providing a single endpoint for complex data requirements.",
      jobProspects: "Growing demand in modern web development! GraphQL developers earn R80k-R140k+. Increasingly adopted by companies building complex APIs.",
      realLifeApplications: "Used by Facebook, GitHub, Shopify, and many modern web applications. Powers flexible APIs that adapt to different client needs efficiently.",
    },
    bash: {
      name: "Bash",
      description: "A Unix shell and command language used for system administration and automation scripting.",
      purpose: "Bash is used for system administration, automation scripts, DevOps tasks, and command-line operations in Unix-like systems.",
      jobProspects: "Essential skill for DevOps and system administrators. Combined with other skills, adds R100k-R200k+ to salaries. Critical for automation and deployment.",
      realLifeApplications: "Used in deployment scripts, system administration, CI/CD pipelines, server management, and automation tasks across virtually all Unix-based systems.",
    },
    powershell: {
      name: "PowerShell",
      description: "Microsoft's command-line shell and scripting language for system administration and automation.",
      purpose: "PowerShell is used for Windows system administration, automation, configuration management, and cross-platform scripting tasks.",
      jobProspects: "Strong demand in Windows environments and DevOps. PowerShell skills add R100k-R200k+ to system admin salaries. Essential for Windows automation.",
      realLifeApplications: "Used in Windows server management, Office 365 administration, Azure automation, and enterprise IT environments for configuration and deployment.",
    },
    cobol: {
      name: "COBOL",
      description: "A legacy programming language still widely used in business and banking systems.",
      purpose: "COBOL is used for maintaining legacy business systems, banking applications, government systems, and large-scale transaction processing.",
      jobProspects: "Steady demand for legacy system maintenance. COBOL developers earn R70k-R120k+. High demand due to shortage of developers and critical legacy systems.",
      realLifeApplications: "Used in banking systems, government agencies, insurance companies, and mainframe applications processing billions of transactions daily.",
    },
    "f#": {
      name: "F#",
      description: "A functional-first programming language in the .NET ecosystem, combining functional and object-oriented programming.",
      purpose: "F# is used for data analysis, financial modeling, web development, and applications requiring functional programming approaches within the .NET ecosystem.",
      jobProspects: "Growing demand in fintech and data analysis. F# developers earn R80k-R140k+. Valued for functional programming and mathematical computing.",
      realLifeApplications: "Used in financial modeling, data analysis, web applications, and scientific computing within Microsoft's .NET ecosystem.",
    },
    assembly: {
      name: "Assembly",
      description: "Low-level programming language with direct correspondence to machine code instructions.",
      purpose: "Assembly is used for system programming, embedded systems, device drivers, performance-critical code, and reverse engineering.",
      jobProspects: "Specialized demand in embedded systems and security. Assembly developers earn R80k-R150k+. Essential for firmware, drivers, and security research.",
      realLifeApplications: "Used in embedded systems, device drivers, bootloaders, security research, and performance-critical sections of operating systems and games.",
    },
    vhdl: {
      name: "VHDL",
      description: "A hardware description language used for modeling and designing digital circuits and systems.",
      purpose: "VHDL is used for digital circuit design, FPGA programming, hardware simulation, and electronic system design in engineering.",
      jobProspects: "Steady demand in hardware engineering. VHDL engineers earn R80k-R140k+. Essential for FPGA development and digital circuit design.",
      realLifeApplications: "Used in FPGA programming, digital circuit design, aerospace systems, telecommunications equipment, and electronic system development.",
    },
    verilog: {
      name: "Verilog",
      description: "A hardware description language used for modeling electronic systems and digital circuits.",
      purpose: "Verilog is used for digital design, FPGA programming, ASIC design, and hardware verification in electronic engineering.",
      jobProspects: "Strong demand in semiconductor industry. Verilog engineers earn R90k-R160k+. Critical for chip design and hardware development.",
      realLifeApplications: "Used in CPU design, FPGA development, ASIC design, and digital system verification in semiconductor companies and hardware engineering.",
    },
    scratch: {
      name: "Scratch",
      description: "A visual, block-based programming language designed for teaching programming concepts to beginners.",
      purpose: "Scratch is used for educational programming, teaching coding concepts to children, and introducing programming logic through visual blocks.",
      jobProspects: "Limited direct job prospects, but valuable for education. Computer science teachers earn R450k-R800k+. Great foundation for learning other languages.",
      realLifeApplications: "Used in schools, coding bootcamps, educational programs, and as an introduction to programming concepts for students of all ages.",
    },
    coldfusion: {
      name: "ColdFusion",
      description: "A web application development platform and scripting language for building dynamic web applications.",
      purpose: "ColdFusion is used for rapid web application development, database integration, and building enterprise web solutions.",
      jobProspects: "Declining demand but still used in legacy systems. ColdFusion developers earn R60k-R100k+. Mainly for maintaining existing applications.",
      realLifeApplications: "Used in government agencies, legacy enterprise applications, and web systems requiring rapid development and database integration.",
    },
    groovy: {
      name: "Groovy",
      description: "A dynamic programming language for the Java platform with concise syntax and powerful features.",
      purpose: "Groovy is used for scripting, build automation (Gradle), testing, and rapid application development on the JVM.",
      jobProspects: "Moderate demand, often combined with Java skills. Groovy developers earn R70k-R120k+. Valued for build automation and testing.",
      realLifeApplications: "Used in Gradle build scripts, Jenkins automation, testing frameworks, and rapid prototyping in Java-based environments.",
    },
    crystal: {
      name: "Crystal",
      description: "A statically typed programming language with Ruby-like syntax and compile-time type checking.",
      purpose: "Crystal is used for web development, system programming, and applications requiring Ruby-like syntax with better performance.",
      jobProspects: "Emerging language with growing interest. Crystal developers earn R70k-R130k+. Gaining traction for performance-critical Ruby-style applications.",
      realLifeApplications: "Used in web APIs, system tools, and applications where Ruby syntax is desired but performance is critical.",
    },
    ballerina: {
      name: "Ballerina",
      description: "A cloud-native programming language designed for integration and network-distributed applications.",
      purpose: "Ballerina is used for microservices, API integration, cloud-native applications, and distributed system development.",
      jobProspects: "Emerging demand in cloud-native development. Ballerina developers earn R80k-R140k+. Growing adoption for integration and microservices.",
      realLifeApplications: "Used in enterprise integration, microservices architectures, API development, and cloud-native applications requiring network communication.",
    },
    nim: {
      name: "Nim",
      description: "A statically typed programming language that combines efficiency, expressiveness, and elegance.",
      purpose: "Nim is used for system programming, web development, game development, and applications requiring high performance with readable code.",
      jobProspects: "Emerging language with growing community. Nim developers earn R70k-R130k+. Gaining interest for performance-critical applications.",
      realLifeApplications: "Used in game development, web backends, system tools, and applications requiring C-like performance with Python-like syntax.",
    },
  };

  const quickPrompts = ["HTML", "CSS", "JavaScript", "Python", "Java", "TypeScript", "C", "Rust", "Go"];
  const goalPrompts = ["I want to learn web development", "I want to learn mobile development", "I want to learn data science", "I want to learn game development"];

  // Fuzzy matching for language names
  const findClosestLanguage = (input) => {
    const languages = Object.keys(languageInfo);
    const inputLower = input.toLowerCase().replace(/\s+/g, '');
    
    // Direct match first
    if (languages.includes(inputLower)) {
      return { match: inputLower, confidence: 1 };
    }
    
    // Check for common variations and typos
    const variations = {
      'typescript': ['type script', 'ts', 'typescrypt', 'typescipt'],
      'javascript': ['java script', 'js', 'javascrypt', 'javasript', 'javscript'],
      'c++': ['cpp', 'c plus plus', 'cplusplus', 'c plus', 'cplus'],
      'c#': ['csharp', 'c sharp', 'c-sharp', 'csharp', 'c#'],
      'objective-c': ['objc', 'objective c', 'obj-c', 'objectivec'],
      'nodejs': ['node js', 'node.js', 'node', 'nodjs'],
      'f#': ['fsharp', 'f sharp', 'f-sharp']
    };
    
    // Check variations
    for (const [lang, vars] of Object.entries(variations)) {
      if (vars.some(v => inputLower.includes(v.replace(/\s+/g, '')) || v.replace(/\s+/g, '').includes(inputLower))) {
        return { match: lang, confidence: 0.8 };
      }
    }
    
    // Fuzzy matching using simple string similarity
    let bestMatch = null;
    let bestScore = 0;
    
    for (const lang of languages) {
      const similarity = calculateSimilarity(inputLower, lang);
      if (similarity > bestScore && similarity > 0.6) {
        bestScore = similarity;
        bestMatch = lang;
      }
    }
    
    return bestMatch ? { match: bestMatch, confidence: bestScore } : null;
  };
  
  // Simple string similarity calculation
  const calculateSimilarity = (str1, str2) => {
    const longer = str1.length > str2.length ? str1 : str2;
    const shorter = str1.length > str2.length ? str2 : str1;
    
    if (longer.length === 0) return 1.0;
    
    const editDistance = levenshteinDistance(longer, shorter);
    return (longer.length - editDistance) / longer.length;
  };
  
  // Levenshtein distance calculation
  const levenshteinDistance = (str1, str2) => {
    const matrix = [];
    
    for (let i = 0; i <= str2.length; i++) {
      matrix[i] = [i];
    }
    
    for (let j = 0; j <= str1.length; j++) {
      matrix[0][j] = j;
    }
    
    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }
    
    return matrix[str2.length][str1.length];
  };

  const bannedWords = ["spam", "hack", "virus", "malware", "inappropriate"];

  // Search Functions
  const searchDuckDuckGo = async (query) => {
    try {
      const response = await fetch(`https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_html=1&skip_disambig=1`);
      const data = await response.json();
      return {
        source: "DuckDuckGo",
        abstract: data.Abstract || data.AbstractText || "",
        url: data.AbstractURL || "",
        relatedTopics: data.RelatedTopics?.slice(0, 3) || []
      };
    } catch (error) {
      console.error("DuckDuckGo search failed:", error);
      return null;
    }
  };

  const searchWikipedia = async (query) => {
    try {
      const response = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`);
      const data = await response.json();
      return {
        source: "Wikipedia",
        abstract: data.extract || "",
        url: data.content_urls?.desktop?.page || "",
        title: data.title || ""
      };
    } catch (error) {
      console.error("Wikipedia search failed:", error);
      return null;
    }
  };

  const searchGoogle = async (query) => {
    // This would require Google Custom Search API key
    // For now, return a placeholder
    return {
      source: "Google",
      abstract: "Google search results would appear here with proper API setup.",
      url: "",
      results: []
    };
  };

  const performSearch = async (query) => {
    const model = aiModels[currentModel];
    
    if (!model.searchEnabled) {
      return null;
    }

    // Check daily limit for Pro model
    if (model.dailyLimit) {
      const today = new Date().toDateString();
      if (lastSearchDate !== today) {
        setDailySearchCount(0);
        setLastSearchDate(today);
      }
      
      if (dailySearchCount >= model.dailyLimit) {
        return {
          error: `Daily search limit reached (${model.dailyLimit} searches). Try again tomorrow or switch to DevDen Explorer for unlimited searches.`
        };
      }
    }

    let searchResult = null;

    if (currentModel === "pro") {
      searchResult = await searchGoogle(query);
      if (model.dailyLimit) {
        setDailySearchCount(prev => prev + 1);
      }
    } else if (currentModel === "explorer") {
      // Try DuckDuckGo first, then Wikipedia
      searchResult = await searchDuckDuckGo(query);
      if (!searchResult?.abstract) {
        searchResult = await searchWikipedia(query);
      }
    }

    return searchResult;
  };

  // Detect if query needs search
  const needsSearch = (query) => {
    const searchTriggers = [
      "latest", "current", "recent", "new", "update", "2024", "2025",
      "what's happening", "news", "trend", "popular", "best practices",
      "market", "salary", "job market", "hiring", "demand"
    ];
    
    return searchTriggers.some(trigger => 
      query.toLowerCase().includes(trigger)
    );
  };

  // Voice input functionality
  const startVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Voice input is not supported in your browser. Please try Chrome or Edge.');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
      alert('Voice input failed. Please try again.');
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  // Export chat functionality
  const exportChatAsTxt = () => {
    const chatContent = messages.map(msg => {
      const sender = msg.sender === 'user' ? (userName || 'User') : 'DevDen Assistant';
      const timestamp = new Date(msg.id).toLocaleString();
      return `[${timestamp}] ${sender}: ${msg.text}`;
    }).join('\n\n');

    const blob = new Blob([chatContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `devden-chat-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const exportChatAsPdf = () => {
    // Create HTML content for PDF
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>DevDen Chat Export</title>
        <style>
          body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
            margin: 0; 
            padding: 20px; 
            line-height: 1.6; 
            background: white;
          }
          .header { 
            text-align: center; 
            margin-bottom: 30px; 
            border-bottom: 3px solid #2563eb; 
            padding-bottom: 15px; 
          }
          .header h1 { 
            color: #2563eb; 
            margin: 0 0 10px 0; 
            font-size: 28px;
          }
          .message { 
            margin-bottom: 20px; 
            padding: 15px; 
            border-radius: 12px; 
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            page-break-inside: avoid;
          }
          .user-message { 
            background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%); 
            margin-left: 15%; 
            border-left: 4px solid #2196f3;
          }
          .bot-message { 
            background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); 
            margin-right: 15%; 
            border-left: 4px solid #6c757d;
          }
          .sender { 
            font-weight: bold; 
            margin-bottom: 5px; 
            color: #333;
            font-size: 14px;
          }
          .timestamp { 
            font-size: 11px; 
            color: #666; 
            margin-bottom: 8px;
          }
          .content { 
            color: #333;
            white-space: pre-wrap;
          }
          .footer {
            margin-top: 40px; 
            text-align: center; 
            font-size: 12px; 
            color: #666;
            border-top: 1px solid #ddd;
            padding-top: 15px;
          }
          @media print {
            body { margin: 0; }
            .message { break-inside: avoid; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>DevDen Assistant Chat Export</h1>
          <p style="margin: 5px 0; color: #666;">Exported on: ${new Date().toLocaleString()}</p>
          ${userName ? `<p style="margin: 5px 0; color: #666;">User: ${userName}</p>` : ''}
        </div>
        ${messages.map(msg => {
          const sender = msg.sender === 'user' ? (userName || 'User') : 'DevDen Assistant';
          const timestamp = new Date(msg.id).toLocaleString();
          const messageClass = msg.sender === 'user' ? 'user-message' : 'bot-message';
          
          // Clean up the message text (remove HTML tags for PDF)
          const cleanText = msg.text
            .replace(/<[^>]*>/g, '') // Remove HTML tags
            .replace(/&nbsp;/g, ' ') // Replace &nbsp; with spaces
            .trim();
          
          return `
            <div class="message ${messageClass}">
              <div class="sender">${sender}</div>
              <div class="timestamp">${timestamp}</div>
              <div class="content">${cleanText}</div>
            </div>
          `;
        }).join('')}
        <div class="footer">
          Generated by DevDen Assistant<br>
          Powered by brelinx.com
        </div>
      </body>
      </html>
    `;

    // Create a new window for printing to PDF
    const printWindow = window.open('', '_blank', 'width=800,height=600');
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    
    // Wait for content to load, then trigger print dialog
    printWindow.onload = () => {
      setTimeout(() => {
        printWindow.print();
      }, 500);
    };
  };

  // Learning goals detection
  const detectLearningGoals = (text) => {
    const goals = {
      'web development': ['html', 'css', 'javascript', 'react', 'nodejs'],
      'mobile development': ['swift', 'kotlin', 'dart', 'react'],
      'data science': ['python', 'r', 'sql', 'scala'],
      'game development': ['c++', 'c#', 'lua'],
      'backend development': ['java', 'python', 'nodejs', 'go', 'rust'],
      'ai': ['python', 'r', 'scala'],
      'machine learning': ['python', 'r', 'scala'],
      'systems programming': ['c', 'c++', 'rust', 'assembly']
    };

    for (const [goal, languages] of Object.entries(goals)) {
      if (text.toLowerCase().includes(goal)) {
        return { goal, languages };
      }
    }
    return null;
  };

  const getBotReply = async (text) => {
    const normalized = text.trim().toLowerCase();
    const creatorKeywords = ["creator", "boss", "maker", "made you", "owner", "who built you", "who created you", "founder", "ceo"];
    const greetingKeywords = ["hi", "hey", "hello", "wassup", "what's up", "whatsup", "what's good", "howzit", "sup", "yo", "good morning", "good afternoon", "good evening"];
    const timeKeywords = ["time", "what time", "current time"];
    const dateKeywords = ["date", "what date", "today", "current date"];
    const nameKeywords = ["my name", "what is my name", "what's my name", "who am i", "do you remember my name"];
    const howAreYouKeywords = ["how are you", "how you doing", "how's it going", "what's up", "how do you feel"];

    // Update last activity
    setLastActivity(Date.now());

    // Handle name collection if we're awaiting a name
    if (awaitingName) {
      const name = text.trim();
      if (name && name.length > 0 && !greetingKeywords.includes(normalized) && !creatorKeywords.some(k => normalized.includes(k))) {
        setUserName(name);
        setAwaitingName(false);
        return `Nice to meet you, ${name}! <SmileIcon /> I'm your DevDen Assistant running on ${aiModels[currentModel].name}. I can help you learn about programming languages and their career prospects. Just type a language keyword like HTML, Python, JavaScript, or any other programming language to get started!\n\n<span style='color: #999; font-size: 0.75rem; opacity: 0.6;'>powered by brelinx.com</span>`;
      }
    }

    // Check for name queries
    if (nameKeywords.some(keyword => normalized.includes(keyword))) {
      if (userName) {
        return `Your name is ${userName}! <SmileIcon /> What programming language would you like to learn about today?\n\n<span style='color: #999; font-size: 0.75rem; opacity: 0.6;'>powered by brelinx.com</span>`;
      } else {
        return `I don't know your name yet! What should I call you?\n\n<span style='color: #999; font-size: 0.75rem; opacity: 0.6;'>powered by brelinx.com</span>`;
      }
    }

    // Check for "how are you" type questions
    if (howAreYouKeywords.some(keyword => normalized.includes(keyword))) {
      const responses = [
        "I'm doing great, thanks for asking! And yourself?",
        "Fantastic, thank you! How about you?",
        "I'm excellent, thanks! How are you doing?",
        "Great, thanks! And how are you today?",
        "I'm wonderful, thank you for asking! How about yourself?"
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      return `${randomResponse} What programming language would you like to learn about today?\n\n<span style='color: #999; font-size: 0.75rem; opacity: 0.6;'>powered by brelinx.com</span>`;
    }

    // Check for learning goals
    const goalDetection = detectLearningGoals(text);
    if (goalDetection) {
      const { goal, languages } = goalDetection;
      const languageList = languages.map(lang => lang.charAt(0).toUpperCase() + lang.slice(1)).join(', ');
      return `Great choice! For ${goal}, I recommend learning these languages: ${languageList} <TargetIcon />\n\nStart with the first one and type its name to learn more about it!\n\n<span style='color: #999; font-size: 0.75rem; opacity: 0.6;'>powered by brelinx.com</span>`;
    }

    // Check for time queries
    if (timeKeywords.some(keyword => normalized.includes(keyword))) {
      const currentTime = new Date().toLocaleTimeString('en-ZA', { 
        timeZone: 'Africa/Johannesburg',
        hour12: true,
        hour: '2-digit',
        minute: '2-digit'
      });
      return `The current time in South Africa is ${currentTime} <ClockIcon />\n\n<span style='color: #999; font-size: 0.75rem; opacity: 0.6;'>powered by brelinx.com</span>`;
    }

    // Check for date queries
    if (dateKeywords.some(keyword => normalized.includes(keyword))) {
      const currentDate = new Date().toLocaleDateString('en-ZA', { 
        timeZone: 'Africa/Johannesburg',
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      return `Today is ${currentDate} <CalendarIcon />\n\n<span style='color: #999; font-size: 0.75rem; opacity: 0.6;'>powered by brelinx.com</span>`;
    }

    // Check for greetings
    if (greetingKeywords.some(keyword => normalized.includes(keyword))) {
      if (userName) {
        return `Hey there, ${userName}! <WaveIcon /> Great to see you again! I'm running on ${aiModels[currentModel].name}. What programming language would you like to learn about today?\n\n<span style='color: #999; font-size: 0.75rem; opacity: 0.6;'>powered by brelinx.com</span>`;
      } else {
        setAwaitingName(true);
        return `Hey there! <WaveIcon /> Welcome to DevDen Assistant! I'm running on ${aiModels[currentModel].name} and here to help you learn about programming languages and career opportunities. What's your name?\n\n<span style='color: #999; font-size: 0.75rem; opacity: 0.6;'>powered by brelinx.com</span>`;
      }
    }

    // Creator check
    if (creatorKeywords.some((k) => normalized.includes(k))) {
      return "I'm created by Uwami Mgxekwa, the CEO and founder of <a href='https://brelinx.com' target='_blank' rel='noopener noreferrer' style='color: var(--accent); text-decoration: underline; text-underline-offset: 4px;'>brelinx.com</a> <UserIcon />. He's passionate about technology and helping people learn programming!\n\n<span style='color: #999; font-size: 0.75rem; opacity: 0.6;'>powered by brelinx.com</span>";
    }

    // Check if search is needed and available
    if (needsSearch(text) && aiModels[currentModel].searchEnabled) {
      try {
        const searchResult = await performSearch(text);
        
        if (searchResult?.error) {
          return `${searchResult.error}\n\n<span style='color: #999; font-size: 0.75rem; opacity: 0.6;'>powered by brelinx.com</span>`;
        }
        
        if (searchResult?.abstract) {
          const remainingSearches = aiModels[currentModel].dailyLimit ? 
            (aiModels[currentModel].dailyLimit - dailySearchCount) : "unlimited";
          
          return `**Search Result from ${searchResult.source}:**\n\n${searchResult.abstract}\n\n${searchResult.url ? `[Read more](${searchResult.url})` : ''}\n\n*Searches remaining today: ${remainingSearches}*\n\n<span style='color: #999; font-size: 0.75rem; opacity: 0.6;'>powered by brelinx.com</span>`;
        }
      } catch (error) {
        console.error("Search failed:", error);
      }
    }

    // Exact keyword match first
    const langKey = normalized;
    if (languageInfo[langKey]) {
      const info = languageInfo[langKey];
      return `${info.name} — ${info.description}\n\nWhat it's for:\n${info.purpose}\n\nJob Prospects:\n${info.jobProspects}\n\nReal-Life Applications:\n${info.realLifeApplications}\n\n<span style='color: #999; font-size: 0.75rem; opacity: 0.6;'>powered by brelinx.com</span>`;
    }

    // Try fuzzy matching for potential typos
    const fuzzyMatch = findClosestLanguage(text);
    if (fuzzyMatch && fuzzyMatch.confidence > 0.7) {
      const suggestedLang = languageInfo[fuzzyMatch.match];
      return `Did you mean "${suggestedLang.name}"? <TargetIcon /> If so, just type "yes" or "${fuzzyMatch.match}" to learn more about it!\n\n<span style='color: #999; font-size: 0.75rem; opacity: 0.6;'>powered by brelinx.com</span>`;
    }

    // Fallback response for unrecognized input
    const randomFunny = funnyResponses[Math.floor(Math.random() * funnyResponses.length)];
    return `${randomFunny}\n\n<span style='color: #999; font-size: 0.75rem; opacity: 0.6;'>powered by brelinx.com</span>`;
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
      
      // Process text content to replace icon placeholders with actual icons
      let content = block.content.trim();
      const iconMap = {
        '<WaveIcon />': <WaveIcon key="wave" />,
        '<ClockIcon />': <ClockIcon key="clock" />,
        '<CalendarIcon />': <CalendarIcon key="calendar" />,
        '<TargetIcon />': <TargetIcon key="target" />,
        '<UserIcon />': <UserIcon key="user" />,
        '<SmileIcon />': <SmileIcon key="smile" />
      };

      // Split content by icon placeholders and create elements
      const parts = [];
      let remainingContent = content;
      
      Object.entries(iconMap).forEach(([placeholder, icon]) => {
        if (remainingContent.includes(placeholder)) {
          const splitContent = remainingContent.split(placeholder);
          const newParts = [];
          splitContent.forEach((part, index) => {
            if (index > 0) newParts.push(icon);
            if (part) newParts.push(part);
          });
          remainingContent = newParts;
        }
      });

      // If no icons were found, render as HTML
      if (typeof remainingContent === 'string') {
        return (
          <div key={`${msg.id || idx}-text-${idx}`} className="leading-relaxed whitespace-pre-line">
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        );
      }

      // Render with icons
      return (
        <div key={`${msg.id || idx}-text-${idx}`} className="leading-relaxed whitespace-pre-line flex items-center gap-1 flex-wrap">
          {Array.isArray(remainingContent) ? remainingContent.map((part, partIdx) => {
            if (typeof part === 'string') {
              return <span key={partIdx} dangerouslySetInnerHTML={{ __html: part }} />;
            }
            return part; // This is an icon component
          }) : <span dangerouslySetInnerHTML={{ __html: remainingContent }} />}
        </div>
      );
    });
  };

  const handleSend = async () => {
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

    const botReply = await getBotReply(userText);
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
        setUserName(parsed.userName ?? "");
        setLearningGoals(parsed.learningGoals ?? []);
        setLastActivity(parsed.lastActivity ?? Date.now());
        setNotificationsEnabled(parsed.notificationsEnabled ?? false);
        setCurrentModel(parsed.currentModel ?? "basic");
        setDailySearchCount(parsed.dailySearchCount ?? 0);
        setLastSearchDate(parsed.lastSearchDate ?? new Date().toDateString());
      } catch (err) {
        console.error("Failed to load saved chat", err);
      }
    }
  }, []);


  useEffect(() => {
    localStorage.setItem(
      "devden-chat",
      JSON.stringify({ messages, theme, fontSize, reduceMotion, userName, learningGoals, lastActivity, notificationsEnabled, currentModel, dailySearchCount, lastSearchDate })
    );
  }, [messages, theme, fontSize, reduceMotion, userName, learningGoals, lastActivity, notificationsEnabled, currentModel, dailySearchCount, lastSearchDate]);

  // Notification system for inactive users (only if enabled)
  useEffect(() => {
    if (!notificationsEnabled) return;

    const checkInactivity = () => {
      const now = Date.now();
      const timeSinceLastActivity = now - lastActivity;
      const oneHour = 60 * 60 * 1000; // 1 hour in milliseconds

      if (timeSinceLastActivity > oneHour && userName && messages.length > 0) {
        // Show notification if browser supports it and permission is granted
        if ('Notification' in window && Notification.permission === 'granted') {
          new Notification('DevDen Assistant', {
            body: `Hey ${userName}! Haven't learned about a new language in a while. Come back and explore more!`,
            icon: '/favicon.ico'
          });
        }
      }
    };

    // Check inactivity every 30 minutes
    const interval = setInterval(checkInactivity, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, [lastActivity, userName, messages, notificationsEnabled]);

  // Close export menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showExportMenu && !event.target.closest('.export-menu-container')) {
        setShowExportMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showExportMenu]);

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

  // Handle mobile viewport changes when keyboard appears
  useEffect(() => {
    const handleResize = () => {
      // Update CSS custom property for viewport height
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    // Set initial value
    handleResize();

    // Listen for resize events (keyboard show/hide)
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  // Handle mobile input focus to prevent zoom
  const handleInputFocus = (e) => {
    // Prevent zoom on mobile by ensuring font-size is at least 16px
    if (window.innerWidth <= 768) {
      e.target.style.fontSize = '16px';
    }
  };

  const handleInputBlur = (e) => {
    // Reset font size after blur
    if (window.innerWidth <= 768) {
      e.target.style.fontSize = '';
    }
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const toggleSettings = () => setShowSettings((s) => !s);
  const clearChat = () => {
    setMessages([]);
    setUserName("");
    setAwaitingName(false);
  };

  const toggleNotifications = async () => {
    if (!notificationsEnabled) {
      // Request permission when enabling notifications
      if ('Notification' in window) {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          setNotificationsEnabled(true);
        } else {
          alert('Notification permission denied. You can enable it later in your browser settings.');
        }
      } else {
        alert('Notifications are not supported in your browser.');
      }
    } else {
      // Simply disable notifications
      setNotificationsEnabled(false);
    }
  };

  return (
    <div
      className="app-container min-h-screen flex items-center justify-center px-3 sm:px-6 py-4 text-[var(--text-primary)] bg-[var(--page-bg)]"
      style={{ fontSize: "var(--app-font-size)" }}
    >
      <div className="w-full max-w-[520px] sm:max-w-[640px] lg:max-w-[780px] h-[100vh] h-[100dvh] sm:h-[88vh] max-h-[960px] bg-[var(--panel-bg)] text-[var(--text-primary)] backdrop-blur-xl border border-[color:var(--panel-border)] shadow-[var(--panel-shadow)] rounded-none sm:rounded-[28px] flex flex-col overflow-hidden transition-colors duration-300">
        <header className="p-3 sm:p-5 border-b border-[color:var(--panel-border)] bg-[var(--panel-header)] flex items-center justify-between gap-2">
          <div className="space-y-1">
            <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-[var(--muted)]">Chat</p>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-semibold text-[var(--text-primary)]">DevDen Assistant</h1>
              <span className="text-xs px-2 py-1 rounded-full bg-[var(--chip-bg)] border border-[color:var(--panel-border)] text-[var(--muted-strong)]">
                {aiModels[currentModel].icon} {aiModels[currentModel].name}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Mobile: Show only essential buttons */}
            <div className="block sm:hidden">
              <button
                onClick={toggleSettings}
                className="inline-flex items-center gap-1 px-2 py-2 rounded-xl border border-[color:var(--panel-border)] bg-[var(--chip-bg)] text-xs font-medium hover:border-[color:var(--accent-soft)] transition"
              >
                <SettingsIcon />
              </button>
            </div>
            
            {/* Desktop: Show all buttons */}
            <div className="hidden sm:flex items-center gap-3 flex-wrap">
              <a
                href="https://uwami-mgxekwa.github.io/DevDen/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-2xl border border-[color:var(--panel-border)] bg-[var(--chip-bg)] text-sm font-medium hover:border-[color:var(--accent-soft)] transition text-[var(--text-primary)]"
              >
                <span>← Back to DevDen</span>
              </a>
              {messages.length > 0 && (
                <div className="relative export-menu-container">
                  <button
                    onClick={() => setShowExportMenu(!showExportMenu)}
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-2xl border border-[color:var(--panel-border)] bg-[var(--chip-bg)] text-sm font-medium hover:border-[color:var(--accent-soft)] transition"
                  >
                    <DocumentIcon /> Export Chat
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M7 10l5 5 5-5z"/>
                    </svg>
                  </button>
                  {showExportMenu && (
                    <div className="absolute top-full mt-2 right-0 bg-[var(--panel-bg)] border border-[color:var(--panel-border)] rounded-2xl shadow-lg z-50 min-w-[160px]">
                      <button
                        onClick={() => {
                          exportChatAsPdf();
                          setShowExportMenu(false);
                        }}
                        className="w-full text-left px-4 py-3 text-sm hover:bg-[var(--chip-bg)] rounded-t-2xl transition"
                      >
                        Export as PDF
                      </button>
                      <button
                        onClick={() => {
                          exportChatAsTxt();
                          setShowExportMenu(false);
                        }}
                        className="w-full text-left px-4 py-3 text-sm hover:bg-[var(--chip-bg)] rounded-b-2xl transition border-t border-[color:var(--panel-border)]"
                      >
                        Export as TXT
                      </button>
                    </div>
                  )}
                </div>
              )}
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
          </div>
        </header>

        <div className="flex-1 overflow-y-auto space-y-3 p-4 sm:p-5 bg-[var(--panel-body)]">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-[var(--muted-strong)]">
              <div className="h-12 w-12 rounded-2xl bg-[var(--text-primary)] text-[var(--panel-bg)] flex items-center justify-center text-lg font-semibold shadow-lg mb-3">
                AI
              </div>
              <p className="font-medium text-[var(--text-primary)]">
                {userName ? `Welcome back, ${userName}!` : "Welcome to DevDen Assistant!"}
              </p>
              <p className="text-sm text-[var(--muted)]">
                {userName 
                  ? "What programming language would you like to learn about today?" 
                  : "Say hi to get started, or try: HTML, CSS, JavaScript, Python, Java, React, SQL, and more!"
                }
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

        <div className="p-3 sm:p-5 border-t border-[color:var(--panel-border)] bg-[var(--panel-footer)] backdrop-blur">
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 items-stretch sm:items-center">
            <div className="flex-1 flex gap-2">
              <input
                className="flex-1 bg-[var(--input-bg)] border border-[color:var(--input-border)] rounded-2xl px-4 py-3 text-base text-[var(--text-primary)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition"
                style={{ fontSize: '16px' }} // Prevent zoom on mobile
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                placeholder={
                  awaitingName 
                    ? "What's your name?" 
                    : userName 
                      ? `Hi ${userName}! Enter a language keyword...`
                      : "Say hi to get started, or enter a language keyword..."
                }
              />
              <button
                onClick={startVoiceInput}
                disabled={isListening}
                className={`px-3 py-3 rounded-2xl border transition ${
                  isListening 
                    ? 'border-red-500 bg-red-50 text-red-600' 
                    : 'border-[color:var(--panel-border)] bg-[var(--chip-bg)] text-[var(--text-primary)] hover:border-[color:var(--accent-soft)]'
                }`}
                title="Voice input"
              >
                {isListening ? <RecordIcon /> : <MicIcon />}
              </button>
            </div>
            <button
              onClick={handleSend}
              className={`inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl font-medium active:translate-y-[1px] transition w-full sm:w-auto ${
                isDark 
                  ? 'bg-white text-black shadow-[0_8px_30px_rgba(255,255,255,0.3)] hover:bg-gray-100' 
                  : 'bg-black text-white shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:bg-gray-800'
              }`}
            >
              <span>Send</span>
              <span className="text-lg leading-none">↗</span>
            </button>
          </div>
          
          {/* Mobile: Collapsible prompts */}
          <div className="mt-3 block sm:hidden">
            <button
              onClick={() => setShowPrompts(!showPrompts)}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-2xl border border-[color:var(--panel-border)] bg-[var(--chip-bg)] text-xs text-[var(--muted-strong)] hover:border-[color:var(--accent-soft)] transition"
            >
              <span>Quick Prompts</span>
              <svg 
                width="12" 
                height="12" 
                viewBox="0 0 24 24" 
                fill="currentColor"
                className={`transition-transform ${showPrompts ? 'rotate-180' : ''}`}
              >
                <path d="M7 10l5 5 5-5z"/>
              </svg>
            </button>
            {showPrompts && (
              <div className="mt-2 space-y-2">
                <div className="flex flex-wrap gap-2">
                  {quickPrompts.slice(0, 6).map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => {
                        setInput(prompt);
                        setShowPrompts(false);
                      }}
                      className="px-3 py-2 rounded-full border border-[color:var(--panel-border)] bg-[var(--chip-bg)] text-xs text-[var(--muted-strong)] hover:border-[color:var(--accent-soft)]"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {goalPrompts.slice(0, 2).map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => {
                        setInput(prompt);
                        setShowPrompts(false);
                      }}
                      className="px-3 py-2 rounded-full border border-[color:var(--accent-soft)] bg-[var(--accent-glow)] text-xs text-[var(--accent)] hover:bg-[var(--accent-soft)] hover:text-white"
                    >
                      {prompt.replace('I want to learn ', '')}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Desktop: Always visible prompts */}
          <div className="hidden sm:block">
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
            <div className="mt-2 flex flex-wrap gap-2">
              {goalPrompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => setInput(prompt)}
                  className="px-3 py-2 rounded-full border border-[color:var(--accent-soft)] bg-[var(--accent-glow)] text-xs text-[var(--accent)] hover:bg-[var(--accent-soft)] hover:text-white"
                >
                  {prompt}
                </button>
              ))}
            </div>
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
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4 z-50">
          <div className="w-full max-w-md bg-[var(--panel-bg)] border border-[color:var(--panel-border)] rounded-3xl p-5 shadow-[var(--panel-shadow)] space-y-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[var(--text-primary)]">Settings</h2>
              <button
                onClick={toggleSettings}
                className="text-[var(--muted-strong)] hover:text-[var(--text-primary)]"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              {/* Model Selection */}
              <div className="border-b border-[color:var(--panel-border)] pb-4">
                <h3 className="text-sm font-medium text-[var(--text-primary)] mb-3">AI Model</h3>
                <div className="space-y-2">
                  {Object.entries(aiModels).map(([key, model]) => (
                    <button
                      key={key}
                      onClick={() => setCurrentModel(key)}
                      className={`w-full text-left p-3 rounded-2xl border transition ${
                        currentModel === key
                          ? "border-[color:var(--accent-soft)] bg-[var(--accent-glow)] text-[var(--text-primary)]"
                          : "border-[color:var(--panel-border)] bg-[var(--chip-bg)] text-[var(--muted-strong)] hover:border-[color:var(--accent-soft)]"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{model.icon}</span>
                        <div className="flex-1">
                          <div className="font-medium text-sm">{model.name}</div>
                          <div className="text-xs text-[var(--muted)] mt-1">{model.description}</div>
                          {key === "pro" && (
                            <div className="text-xs text-[var(--accent)] mt-1">
                              {dailySearchCount}/{model.dailyLimit} searches used today
                            </div>
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile-only actions */}
              <div className="block sm:hidden space-y-3">
                <div className="border-b border-[color:var(--panel-border)] pb-3">
                  <h3 className="text-sm font-medium text-[var(--text-primary)] mb-2">Actions</h3>
                  <div className="space-y-2">
                    <a
                      href="https://uwami-mgxekwa.github.io/DevDen/"
                      target="_blank"
                      rel="noreferrer"
                      className="w-full inline-flex items-center gap-2 px-3 py-2 rounded-2xl border border-[color:var(--panel-border)] bg-[var(--chip-bg)] text-sm font-medium hover:border-[color:var(--accent-soft)] transition"
                    >
                      ← Back to DevDen
                    </a>
                    {messages.length > 0 && (
                      <>
                        <button
                          onClick={() => {
                            exportChatAsPdf();
                            setShowSettings(false);
                          }}
                          className="w-full inline-flex items-center gap-2 px-3 py-2 rounded-2xl border border-[color:var(--panel-border)] bg-[var(--chip-bg)] text-sm font-medium hover:border-[color:var(--accent-soft)] transition"
                        >
                          <DocumentIcon /> Export as PDF
                        </button>
                        <button
                          onClick={() => {
                            exportChatAsTxt();
                            setShowSettings(false);
                          }}
                          className="w-full inline-flex items-center gap-2 px-3 py-2 rounded-2xl border border-[color:var(--panel-border)] bg-[var(--chip-bg)] text-sm font-medium hover:border-[color:var(--accent-soft)] transition"
                        >
                          <DocumentIcon /> Export as TXT
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => {
                        clearChat();
                        setShowSettings(false);
                      }}
                      className="w-full inline-flex items-center gap-2 px-3 py-2 rounded-2xl border border-red-200 bg-red-50 text-sm font-medium text-red-600 hover:bg-red-100 transition"
                    >
                      Clear Chat
                    </button>
                  </div>
                </div>
              </div>

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

              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[var(--muted-strong)]">Inactivity reminders</span>
                  <span className="text-xs text-[var(--muted)] mt-1">Get notified after 1 hour of inactivity</span>
                </div>
                <label className="inline-flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notificationsEnabled}
                    onChange={toggleNotifications}
                    className="accent-[var(--accent)]"
                  />
                  <span className="text-sm text-[var(--muted-strong)]">Enable notifications</span>
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