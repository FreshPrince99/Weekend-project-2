"use client";

import { useState } from "react";
import { useChat } from "ai/react";

export default function Chat() {
  const { messages, append, isLoading } = useChat();
  const topics = [
    { emoji: "🧑‍💼", value: "Work" },
    { emoji: "🙋‍♂️", value: "People" },
    { emoji: "🐕", value: "Animals" },
    { emoji: "🍕", value: "Food" },
  ];
  const tones = [
    { emoji: "😂", value: "Witty" },
    { emoji: "😝", value: "Silly" },
    { emoji: "😏", value: "Sarcastic" },
    { emoji: "💀", value: "Dark" },
  ];
  const typeofJoke = [
    { emoji: "🤣", value: "Pun" },
    { emoji: "🚪", value: "Knock-knock joke" },
    { emoji: "📖", value: "Story" },
  ];

  const [state, setState] = useState({
    topic: "",
    tone: "",
    typeofJoke: "",
  }); 
  
  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [name]: value,
    });
  };

  return (
    <main className="mx-auto w-full p-24 flex flex-col">
      <div className="p4 m-4">
        <div className="flex flex-col items-center justify-center space-y-8 text-white">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold">Joke Generation App</h2>
            <p className="text-zinc-500 dark:text-zinc-400">
              Customize the joke by selecting the topic, tone and type.
            </p>
          </div>

          {/* topic selection code */}
          <div className="space-y-4 bg-opacity-25 bg-gray-700 rounded-lg p-4">
            <h3 className="text-xl font-semibold">Topic</h3>

            <div className="flex flex-wrap justify-center">
              {topics.map(({ value, emoji }) => (
                <div
                  key={value}
                  className="p-4 m-2 bg-opacity-25 bg-gray-600 rounded-lg"
                >
                  <input
                    id={value}
                    type="radio"
                    value={value}
                    name="topic"
                    onChange={handleChange}
                  />
                  <label className="ml-2" htmlFor={value}>
                    {`${emoji} ${value}`}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* tone selection code */}
          <div className="space-y-4 bg-opacity-25 bg-gray-700 rounded-lg p-4">
            <h3 className="text-xl font-semibold">Tone</h3>

            <div className="flex flex-wrap justify-center">
              {tones.map(({ value, emoji }) => (
                <div
                  key={value}
                  className="p-4 m-2 bg-opacity-25 bg-gray-600 rounded-lg"
                >
                  <input
                    id={value}
                    type="radio"
                    value={value}
                    name="tone"
                    onChange={handleChange}
                  />
                  <label className="ml-2" htmlFor={value}>
                    {`${emoji} ${value}`}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* typeofJoke selection code */}
          <div className="space-y-4 bg-opacity-25 bg-gray-700 rounded-lg p-4">
            <h3 className="text-xl font-semibold">Type</h3>

            <div className="flex flex-wrap justify-center">
              {typeofJoke.map(({ value, emoji }) => (
                <div
                  key={value}
                  className="p-4 m-2 bg-opacity-25 bg-gray-600 rounded-lg"
                >
                  <input
                    id={value}
                    type="radio"
                    value={value}
                    name="typeofJoke"
                    onChange={handleChange}
                  />
                  <label className="ml-2" htmlFor={value}>
                    {`${emoji} ${value}`}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* button code */}
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
            disabled={isLoading || (!state.topic || !state.tone || !state.typeofJoke)}
            onClick={() =>
              append({
                role: "user",
                content: `Generate a funny ${state.typeofJoke} about the topic ${state.topic} in a ${state.tone} tone `,
              })
            }
          >
            Generate Joke
          </button>

          {/* chat messages code */}
          <div
            hidden={
              messages.length === 0 ||
              messages[messages.length - 1]?.content.startsWith("Generate")
            }
            className="bg-opacity-25 bg-gray-700 rounded-lg p-4"
          >
            {messages[messages.length - 1]?.content}
          </div>
        </div>
      </div>
    </main>
  );
}