'use client';
import { useState } from 'react';

export default function Home() {
  const [responses, setResponses] = useState(['', '', '']);

  async function handleStreams() {
    const prompts = [
      'Tell me a short joke',
      'Write a haiku',
      'Give me a fun fact'
    ];

    const streams = await Promise.all(
      prompts.map(prompt =>
        fetch('/api/streams', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt })
        })
      )
    );

    const readers = streams.map(stream => stream.body?.getReader());
    const decoders = readers.map(() => new TextDecoder());

    while (true) {
      const results = await Promise.all(
        readers.map(async (reader, index) => {
          const { done, value } = await reader!.read();
          if (done) return null;
          return decoders[index].decode(value);
        })
      );

      if (results.every(r => r === null)) break;

      setResponses(prev => 
        prev.map((text, i) => 
          results[i] ? text + results[i] : text
        )
      );
    }
  }

  return (
    <div className="p-4">
      <button 
        onClick={handleStreams}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Start Streams
      </button>
      <div className="grid grid-cols-3 gap-4">
        {responses.map((response, i) => (
          <div key={i} className="p-4 border rounded min-h-[200px]">
            <h3 className="font-bold mb-2">Stream {i + 1}</h3>
            <p className="whitespace-pre-wrap">{response}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
