"use client";
import { useChat } from "@ai-sdk/react";

export default function Home() {
  const endpoint = "/api/chat";
  const {
    messages: m1,
    append: append1,
    status,
  } = useChat({
    api: endpoint,
  });
  const {
    messages: m2,
    append: append2,
    status: status2,
  } = useChat({
    api: endpoint,
  });
  const {
    messages: m3,
    append: append3,
    status: status3,
  } = useChat({
    api: endpoint,
  });

  const loading =
    status !== "ready" || status2 !== "ready" || status3 !== "ready";

  async function handleStreams() {
    const prompts = [
      "Tell me a short joke",
      "Write a haiku",
      "Give me a fun fact",
    ];

    append1({ role: "user", content: prompts[0] });
    append2({ role: "user", content: prompts[1] });
    append3({ role: "user", content: prompts[2] });
  }

  return (
    <div className="p-4">
      <button
        onClick={handleStreams}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-500 disabled:opacity-50"
        disabled={loading || m1.length !== 0 || m2.length !== 0 || m3.length !== 0}
      >
        {loading ? "Loading..." : "Start Streams"}
      </button>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <div className="p-4 border rounded min-h-[200px] space-y-8">
            <h3 className="font-bold mb-2">Stream 1</h3>
            {m1.map((message, index) => (
              <div key={message.id + index}>
                <h4 className="font-semibold mt-2">{message.role}</h4>
                <p className="whitespace-pre-wrap">
                  {message.parts.map((p) => (p.type === "text" ? p.text : ""))}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="p-4 border rounded min-h-[200px] space-y-8">
            <h3 className="font-bold mb-2">Stream 2</h3>
            {m2.map((message, index) => (
              <div key={message.id + index}>
                <h4 className="font-semibold mt-2">{message.role}</h4>
                <p className="whitespace-pre-wrap">
                  {message.parts.map((p) => (p.type === "text" ? p.text : ""))}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="p-4 border rounded min-h-[200px] space-y-8">
          <h3 className="font-bold mb-2">Stream 3</h3>
          {m3.map((message, index) => (
            <div key={message.id + index}>
              <h4 className="font-semibold mt-2">{message.role}</h4>
              <p className="whitespace-pre-wrap">
                {message.parts.map((p) => (p.type === "text" ? p.text : ""))}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
