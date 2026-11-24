import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Bot,
  Send,
  Sparkles,
  HelpCircle,
  FileText,
  CheckCircle,
  XCircle,
  RotateCcw,
  Zap,
  BookOpen,
  Award,
} from "lucide-react";
import { useStudentContext } from "../context/StudentContext";

const PRESET_KNOWLEDGE = {
  "banker": "The Banker's Algorithm is a deadlock avoidance algorithm named by Edsger Dijkstra. It tests for safety by simulating the allocation of predetermined maximum possible amounts of all resources, and then makes an 's-state' check to test for possible deadlocks before deciding whether allocation should be allowed to continue.",
  "avl": "An AVL tree is a self-balancing binary search tree where the heights of the two child subtrees of any node differ by at most one (Balance Factor = -1, 0, or 1). Lookups, insertions, and deletions all take O(log n) time, utilizing single and double rotations (LL, RR, LR, RL) when unbalanced.",
  "dbms": "Database Normalization is the process of organizing data to minimize redundancy and prevent insert/update/delete anomalies. 1NF removes repeating groups, 2NF removes partial dependency, 3NF removes transitive dependency (X -> Y where X is not superkey), and BCNF ensures that for every functional dependency X -> Y, X must be a superkey.",
  "osi": "The OSI (Open Systems Interconnection) reference model consists of 7 layers: 1. Physical (bits), 2. Data Link (frames/MAC), 3. Network (packets/IP), 4. Transport (segments/TCP-UDP), 5. Session, 6. Presentation (encryption/compression), and 7. Application (HTTP/DNS/FTP).",
};

const SAMPLE_QUIZZES = [
  {
    question: "What is the worst-case time complexity of searching an element in an AVL tree?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
    answer: 1,
    explanation: "Because the balance factor is strictly maintained between -1 and +1, height is bounded by 1.44 log n, giving O(log n) worst-case search.",
  },
  {
    question: "Which condition is NOT a necessary condition for Deadlock to occur?",
    options: ["Mutual Exclusion", "Hold and Wait", "Preemption Allowed", "Circular Wait"],
    answer: 2,
    explanation: "Deadlock requires NO preemption. If preemption is allowed, deadlock cannot occur.",
  },
  {
    question: "A relation is in BCNF if and only if for every functional dependency X -> Y:",
    options: ["Y is a primary key", "X is a super key", "X is a foreign key", "Y is a prime attribute"],
    answer: 1,
    explanation: "Boyce-Codd Normal Form strictly dictates that the left-hand determinant X must be a superkey.",
  },
  {
    question: "Which protocol operates at the Transport Layer of the OSI Model and is connectionless?",
    options: ["TCP", "IP", "UDP", "ARP"],
    answer: 2,
    explanation: "UDP (User Datagram Protocol) is a lightweight, connectionless transport layer protocol with zero handshake overhead.",
  },
  {
    question: "In Virtual Memory management, the phenomenon where page fault rate skyrockets is called:",
    options: ["Paging", "Thrashing", "Belady's Anomaly", "Segmentation"],
    answer: 1,
    explanation: "Thrashing occurs when the system spends more time servicing page faults and swapping pages than executing user processes.",
  },
];

export default function AIStudyAssistant() {
  const { currentStudent, addToast } = useStudentContext();

  const [activeTab, setActiveTab] = useState("chat"); // 'chat' | 'quiz' | 'summaries'

  // Chatbot State
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "ai",
      text: `Hello ${currentStudent?.name || "Student"}! I am your EduFlow AI Academic Assistant. I have indexed all your Semester V lecture notes, syllabus, and PYQs for Data Structures, Operating Systems, DBMS, and Computer Networks. What would you like to review today?`,
    },
  ]);
  const [inputQuery, setInputQuery] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Quiz State
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);

  // Send message
  const handleSendMessage = (textToSend = inputQuery) => {
    if (!textToSend.trim()) return;

    const userMsg = { id: Date.now(), sender: "user", text: textToSend };
    setMessages((prev) => [...prev, userMsg]);
    setInputQuery("");
    setIsTyping(true);

    setTimeout(() => {
      const lower = textToSend.toLowerCase();
      let reply = "Here is what your lecture notes highlight: ";

      if (lower.includes("banker") || lower.includes("deadlock")) {
        reply = PRESET_KNOWLEDGE.banker;
      } else if (lower.includes("avl") || lower.includes("tree")) {
        reply = PRESET_KNOWLEDGE.avl;
      } else if (lower.includes("normal") || lower.includes("dbms") || lower.includes("bcnf")) {
        reply = PRESET_KNOWLEDGE.dbms;
      } else if (lower.includes("osi") || lower.includes("network")) {
        reply = PRESET_KNOWLEDGE.osi;
      } else {
        reply = `According to your Unit lecture notes on ${textToSend}, this topic is covered in Chapter 4. Key concepts include foundational principles, algorithmic trade-offs, and university exam relevance with expected 16-mark descriptive questions. Would you like a 3-point summary or a practice quiz on this?`;
      }

      setMessages((prev) => [...prev, { id: Date.now() + 1, sender: "ai", text: reply }]);
      setIsTyping(false);
    }, 900);
  };

  const handleSelectOption = (idx) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(idx);
  };

  const handleSubmitQuizAnswer = () => {
    if (selectedOption === null) return;
    setIsAnswerSubmitted(true);
    if (selectedOption === SAMPLE_QUIZZES[currentQuizIndex].answer) {
      setQuizScore((prev) => prev + 1);
    }
  };

  const handleNextQuizQuestion = () => {
    if (currentQuizIndex < SAMPLE_QUIZZES.length - 1) {
      setCurrentQuizIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      setIsQuizCompleted(true);
      addToast("Quiz Completed", `You scored ${quizScore + (selectedOption === SAMPLE_QUIZZES[currentQuizIndex].answer ? 1 : 0)} / 5! Earned +40 XP.`, "success");
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuizIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setQuizScore(0);
    setIsQuizCompleted(false);
  };

  return (
    <div className="ai-study-page-wrapper">
      {/* Top Banner */}
      <div className="page-header-card">
        <div>
          <div className="flex-center gap-8">
            <span className="section-pill">AI ACADEMIC CO-PILOT</span>
            <span className="badge-pill-emerald">Course Index Synced</span>
          </div>
          <h1 className="page-main-heading">
            AI Study Assistant & <span className="text-glow-emerald">Knowledge Engine</span>
          </h1>
          <p className="page-subtext">
            Ask doubts from your own curriculum materials, generate dynamic quizzes, and get instant revision summaries.
          </p>
        </div>

        <div className="academics-nav-pills">
          <button
            className={`academic-pill-btn ${activeTab === "chat" ? "active" : ""}`}
            onClick={() => setActiveTab("chat")}
          >
            <Bot size={16} /> Course Chatbot
          </button>
          <button
            className={`academic-pill-btn ${activeTab === "quiz" ? "active" : ""}`}
            onClick={() => setActiveTab("quiz")}
          >
            <HelpCircle size={16} /> AI Quiz Generator
          </button>
          <button
            className={`academic-pill-btn ${activeTab === "summaries" ? "active" : ""}`}
            onClick={() => setActiveTab("summaries")}
          >
            <FileText size={16} /> Revision Summaries
          </button>
        </div>
      </div>

      {/* TAB 1: CHATBOT */}
      {activeTab === "chat" && (
        <div className="ai-chat-container mt-24">
          {/* Quick Prompt Pills */}
          <div className="quick-prompts-row">
            <span className="text-xs text-muted font-bold">Suggested Topics:</span>
            {[
              "Explain Banker's Algorithm",
              "Compare AVL vs Red-Black Tree",
              "Explain Normalization 1NF to BCNF",
              "Overview of OSI 7 Layers",
            ].map((p) => (
              <button
                key={p}
                className="prompt-chip"
                onClick={() => handleSendMessage(p)}
              >
                ✨ {p}
              </button>
            ))}
          </div>

          {/* Messages Stream */}
          <div className="chat-messages-box">
            {messages.map((m) => (
              <div key={m.id} className={`chat-bubble-row ${m.sender}`}>
                {m.sender === "ai" && (
                  <div className="ai-avatar-badge">
                    <Bot size={18} className="text-emerald" />
                  </div>
                )}
                <div className={`chat-bubble ${m.sender}`}>
                  <p>{m.text}</p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="chat-bubble-row ai">
                <div className="ai-avatar-badge">
                  <Bot size={18} className="text-emerald" />
                </div>
                <div className="chat-bubble ai is-typing">
                  <span className="dot" />
                  <span className="dot" />
                  <span className="dot" />
                </div>
              </div>
            )}
          </div>

          {/* Input Bar */}
          <form
            className="chat-input-bar"
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
          >
            <input
              type="text"
              placeholder="Ask anything about your syllabus, lecture notes, or university question patterns..."
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
            />
            <button type="submit" className="btn-primary-neon">
              <Send size={16} /> Send
            </button>
          </form>
        </div>
      )}

      {/* TAB 2: AI QUIZ GENERATOR */}
      {activeTab === "quiz" && (
        <div className="ai-quiz-container mt-24">
          {!isQuizCompleted ? (
            <div className="analytics-card quiz-card">
              <div className="flex-between items-center mb-16">
                <div>
                  <span className="section-pill">QUESTION {currentQuizIndex + 1} OF 5</span>
                  <h3 className="quiz-q-title">
                    {SAMPLE_QUIZZES[currentQuizIndex].question}
                  </h3>
                </div>
                <div className="quiz-score-badge">
                  <span>Score: {quizScore} / {currentQuizIndex}</span>
                </div>
              </div>

              {/* Options */}
              <div className="quiz-options-list">
                {SAMPLE_QUIZZES[currentQuizIndex].options.map((opt, idx) => {
                  const isSelected = selectedOption === idx;
                  const isCorrect = idx === SAMPLE_QUIZZES[currentQuizIndex].answer;

                  let optClass = "";
                  if (isAnswerSubmitted) {
                    if (isCorrect) optClass = "correct";
                    else if (isSelected && !isCorrect) optClass = "wrong";
                  } else if (isSelected) {
                    optClass = "selected";
                  }

                  return (
                    <button
                      key={idx}
                      className={`quiz-opt-btn ${optClass}`}
                      onClick={() => handleSelectOption(idx)}
                    >
                      <span className="opt-letter">{["A", "B", "C", "D"][idx]}</span>
                      <span className="opt-text">{opt}</span>
                      {isAnswerSubmitted && isCorrect && <CheckCircle size={18} className="text-emerald" />}
                      {isAnswerSubmitted && isSelected && !isCorrect && <XCircle size={18} className="text-rose" />}
                    </button>
                  );
                })}
              </div>

              {/* Explanation Banner */}
              {isAnswerSubmitted && (
                <div className="quiz-explanation-box">
                  <strong>Explanation:</strong>
                  <p>{SAMPLE_QUIZZES[currentQuizIndex].explanation}</p>
                </div>
              )}

              {/* Footer Controls */}
              <div className="quiz-footer-actions mt-20">
                {!isAnswerSubmitted ? (
                  <button
                    className="btn-primary-neon"
                    onClick={handleSubmitQuizAnswer}
                    disabled={selectedOption === null}
                  >
                    Check Answer
                  </button>
                ) : (
                  <button className="btn-primary-neon" onClick={handleNextQuizQuestion}>
                    Next Question <Zap size={15} />
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="analytics-card quiz-result-card text-center">
              <Award size={64} className="text-emerald mx-auto mb-16" />
              <h2>Quiz Completed!</h2>
              <p className="text-muted mb-16">Here is your performance breakdown for Semester V concepts:</p>
              <div className="quiz-final-score">
                <span>{quizScore}</span> / 5 Correct
              </div>
              <div className="flex-center justify-center gap-12 mt-24">
                <button className="btn-secondary" onClick={handleRestartQuiz}>
                  <RotateCcw size={15} /> Try Another Quiz
                </button>
                <button className="btn-primary-neon" onClick={() => setActiveTab("chat")}>
                  Ask AI About Mistakes
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: REVISION SUMMARIES */}
      {activeTab === "summaries" && (
        <div className="summaries-grid mt-24">
          <div className="analytics-card">
            <span className="section-pill">CHEAT SHEET</span>
            <h3 className="card-title">Data Structures & Algorithms</h3>
            <ul className="summary-bullet-list">
              <li><strong>Binary Search Tree vs AVL:</strong> AVL tree guarantees O(log n) worst-case lookup by enforcing max height difference of 1 through 4 rotation types.</li>
              <li><strong>Graph Traversal:</strong> BFS uses a Queue (shortest path in unweighted graphs), DFS uses a Stack/Recursion (cycle detection and topological sort).</li>
              <li><strong>Dynamic Programming:</strong> Solves problems with Overlapping Subproblems and Optimal Substructure (Memoization: Top-Down, Tabulation: Bottom-Up).</li>
            </ul>
          </div>

          <div className="analytics-card">
            <span className="section-pill">CHEAT SHEET</span>
            <h3 className="card-title">Operating Systems Internals</h3>
            <ul className="summary-bullet-list">
              <li><strong>Process vs Thread:</strong> Process is an independent execution unit with its own address space; thread is a lightweight unit sharing code and heap.</li>
              <li><strong>Scheduling:</strong> Round Robin uses time quantum (preemptive), Shortest Job First is provably optimal for minimizing average waiting time.</li>
              <li><strong>Deadlock Prevention:</strong> Break at least one of the 4 Coffman conditions: Mutual Exclusion, Hold & Wait, No Preemption, Circular Wait.</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
