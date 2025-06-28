"use client";

import { useState } from "react";
import { AllocationRule } from "../lib/types";
import { string } from "zod/v4";

interface RuleManagerProps {
  rules: AllocationRule[];
  setRules: (rules: AllocationRule[]) => void;
}

export default function RuleManager({ rules, setRules }: RuleManagerProps) {
  // Controlled inputs
  const [taskField, setTaskField] = useState("");
  const [taskOperator, setTaskOperator] = useState("=");
  const [taskValue, setTaskValue] = useState("");

  const [workerField, setWorkerField] = useState("");
  const [workerOperator, setWorkerOperator] = useState("=");
  const [workerValue, setWorkerValue] = useState("");

  const [maxTasks, setMaxTasks] = useState("");

  const handleAddRule = () => {
    if (!taskField || !taskValue || !workerField || !workerValue) {
      alert("Please fill in all rule fields.");
      return;
    }

   const newRule: AllocationRule = {
    id: Date.now().toString(36) + Math.random().toString(36).substring(2, 8),
    taskFilter: {
    field: taskField,
    operator: taskOperator as AllocationRule["taskFilter"]["operator"],
    value: taskValue,
  },
  workerFilter: {
    field: workerField,
    operator: workerOperator as AllocationRule["workerFilter"]["operator"],
    value: workerValue,
  },
  maxTasksPerWorker: parseInt(maxTasks || "1", 10),
};


    setRules([...rules, newRule]);

    // Reset inputs
    setTaskField("");
    setTaskOperator("=");
    setTaskValue("");
    setWorkerField("");
    setWorkerOperator("=");
    setWorkerValue("");
    setMaxTasks("");
  };

  return (
    <div className="w-full max-w-3xl bg-[#1B1B1B]/80 p-6 rounded-lg mt-8">
      <h2 className="text-xl font-bold mb-4">Allocation Rules</h2>
      <div className="flex flex-wrap gap-4 mb-4">
        {/* Task Filter */}
        <div className="flex flex-col">
          <label className="text-sm">Task Field</label>
          <input
            className="bg-gray-800 text-white px-2 py-1 rounded"
            value={taskField}
            onChange={(e) => setTaskField(e.target.value)}
            placeholder="e.g., PRIORITYLEVEL"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">Operator</label>
          <select
            className="bg-gray-800 text-white px-2 py-1 rounded"
            value={taskOperator}
            onChange={(e) => setTaskOperator(e.target.value)}
          >
            <option>=</option>
            <option>!=</option>
            <option>&gt;</option>
            <option>&gt;=</option>
            <option>&lt;</option>
            <option>&lt;=</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label className="text-sm">Value</label>
          <input
            className="bg-gray-800 text-white px-2 py-1 rounded"
            value={taskValue}
            onChange={(e) => setTaskValue(e.target.value)}
            placeholder="e.g., 2"
          />
        </div>

        {/* Worker Filter */}
        <div className="flex flex-col">
          <label className="text-sm">Worker Field</label>
          <input
            className="bg-gray-800 text-white px-2 py-1 rounded"
            value={workerField}
            onChange={(e) => setWorkerField(e.target.value)}
            placeholder="e.g., QUALIFICATIONLEVEL"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">Operator</label>
          <select
            className="bg-gray-800 text-white px-2 py-1 rounded"
            value={workerOperator}
            onChange={(e) => setWorkerOperator(e.target.value)}
          >
            <option>=</option>
            <option>!=</option>
            <option>&gt;</option>
            <option>&gt;=</option>
            <option>&lt;</option>
            <option>&lt;=</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label className="text-sm">Value</label>
          <input
            className="bg-gray-800 text-white px-2 py-1 rounded"
            value={workerValue}
            onChange={(e) => setWorkerValue(e.target.value)}
            placeholder="e.g., Senior"
          />
        </div>

        {/* Max Tasks */}
        <div className="flex flex-col">
          <label className="text-sm">Max Tasks Per Worker</label>
          <input
            className="bg-gray-800 text-white px-2 py-1 rounded"
            type="number"
            min="1"
            value={maxTasks}
            onChange={(e) => setMaxTasks(e.target.value)}
            placeholder="e.g., 2"
          />
        </div>
      </div>
      <button
        className="bg-green-500 text-black px-4 py-2 rounded font-semibold"
        onClick={handleAddRule}
      >
        Add Rule
      </button>

      {rules.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Current Rules:</h3>
          <ul className="list-disc ml-4">
            {rules.map((r, idx) => (
              <li key={idx} className="text-sm">
                Task [{r.taskFilter.field} {r.taskFilter.operator} {r.taskFilter.value}] &amp; Worker [{r.workerFilter.field} {r.workerFilter.operator} {r.workerFilter.value}] — Max Tasks: {r.maxTasksPerWorker}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
