"use client";
import { experimental_useObject as useObject } from "@ai-sdk/react";
import { z } from "zod";

const schema = z.object({
  name: z.string(),
  favoriteTeam: z.string(),
});
export default function Home() {
  const endpoint = "/api/object";
  const {
    object: o1,
    isLoading: isLoading1,
    submit: submit1,
  } = useObject({
    api: endpoint,
    schema,
  });
  const {
    object: o2,
    isLoading: isLoading2,
    submit: submit2,
  } = useObject({
    api: endpoint,
    schema,
  });
  const {
    object: o3,
    isLoading: isLoading3,
    submit: submit3,
  } = useObject({
    api: endpoint,
    schema,
  });

  const loading = isLoading1 || isLoading2 || isLoading3;

  async function handleStreams() {
    const prompts = [
      "My name is nico and my favorite team is arsenal",
      "my name is lars and my favorite team is frankfurt",
      "my name is rauchg and my favorite team is argentina",
    ];

    submit1(prompts[0]);
    submit2(prompts[1]);
    submit3(prompts[2]);
  }

  return (
    <div className="p-4">
      <button
        onClick={handleStreams}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-500 disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Loading..." : "Start Streams"}
      </button>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <div className="p-4 border rounded min-h-[200px] space-y-8">
            <h3 className="font-bold mb-2">Stream 1</h3>
            {JSON.stringify(o1, null, 2)}
          </div>
        </div>
        <div>
          <div className="p-4 border rounded min-h-[200px] space-y-8">
            <h3 className="font-bold mb-2">Stream 2</h3>
            {JSON.stringify(o2, null, 2)}
          </div>
        </div>
        <div className="p-4 border rounded min-h-[200px] space-y-8">
          <h3 className="font-bold mb-2">Stream 3</h3>
          {JSON.stringify(o3, null, 2)}
        </div>
      </div>
    </div>
  );
}
