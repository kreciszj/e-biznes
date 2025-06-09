import { useState, useRef, useEffect } from "react";

export default function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const boxRef = useRef(null);

  useEffect(() => {
    if (boxRef.current) {
      boxRef.current.scrollTop = boxRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    fetch("http://localhost:8000/start")
      .then((res) => res.json())
      .then((data) => {
        setMessages([{ role: "bot", content: data.message }]);
      });
  }, []);

  const send = async () => {
    const text = input.trim();
    if (!text) return;
    setMessages((msgs) => [...msgs, { role: "user", content: text }]);
    setInput("");
    setMessages((msgs) => [...msgs, { role: "bot", content: "..." }]);

    try {
      const r = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      const d = await r.json();
      setMessages((msgs) => [
        ...msgs.slice(0, -1),
        { role: "bot", content: d.response || "Błąd" },
      ]);
    } catch {
      setMessages((msgs) => [...msgs.slice(0, -1), { role: "bot", content: "Błąd połączenia" }]);
    }
  };

  const endConversation = async () => {
    const r = await fetch("http://localhost:8000/end");
    const d = await r.json();
    setMessages((msgs) => [...msgs, { role: "bot", content: d.message }]);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-xl bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-center text-xl font-semibold mb-4 text-gray-800">
          Llama - 3.3 - 70B - Instruct - Turbo - Free
        </h1>

        <div
          ref={boxRef}
          className="border border-gray-300 rounded-md p-3 h-96 overflow-y-auto mb-3 space-y-1"
        >
          {messages.map((m, i) => (
            <div
              key={i}
              className={`whitespace-pre-wrap ${
                m.role === "user" ? "font-medium text-right" : "text-blue-600"
              }`}
            >
              {m.content}
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            className="flex-1 border border-gray-300 rounded-md px-2 py-1"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                send();
              }
            }}
            placeholder="Wpisz wiadomość"
          />
          <button
            className="px-4 py-1 bg-blue-600 text-white rounded-md"
            onClick={send}
          >
            Wyślij
          </button>
          <button
            className="px-4 py-1 bg-gray-300 text-black rounded-md"
            onClick={endConversation}
          >
            Zakończ
          </button>
        </div>
      </div>
    </div>
  );
}
