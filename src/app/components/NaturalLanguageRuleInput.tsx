import React, { useState } from "react";
import { parseRuleFromNaturalLanguage } from "../lib/parseRuleFromNaturalLanguage";
import { parseRuleWithGemini } from "../lib/parseGeminiWithAxios";

export default function NaturalLanguageRuleInput({
  onRuleGenerated,
}: {
  onRuleGenerated: (rule: any) => void;
}) {
  const [input, setInput] = useState("");
  const [appliesTo, setAppliesTo] = useState<"task" | "worker">("task");
  const [error, setError] = useState("");

  const handleGenerate = async () => {
  const rule = await parseRuleWithGemini(input);
  if (rule) {
    onRuleGenerated(rule);
    setInput("");
    setError("");
  } else {
    setError("Could not parse a valid rule. Try again.");
  }
};


  return (
    <div className="mt-6 p-4 border border-gray-700 rounded-lg bg-[#1b1b1b]">
      <h3 className="text-lg font-semibold mb-2">Natural Language Rule</h3>
      <div className="flex flex-col md:flex-row gap-2">
        <input
          type="text"
          placeholder="e.g., PriorityLevel > 3"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full p-2 bg-black text-white border border-gray-600 rounded"
        />
        <select
          value={appliesTo}
          onChange={(e) => setAppliesTo(e.target.value as "task" | "worker")}
          className="bg-black text-white border border-gray-600 rounded p-2"
        >
          <option value="task">Task Filter</option>
          <option value="worker">Worker Filter</option>
        </select>
        <button
          onClick={handleGenerate}
          className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded"
        >
          Generate Rule
        </button>
      </div>
      {error && <p className="text-red-400 mt-2">{error}</p>}
    </div>
  );
}
