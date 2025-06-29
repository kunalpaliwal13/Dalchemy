"use client";

import { useState } from "react";
import { AllocationRule } from "../lib/types";

interface RuleManagerProps {
  rules: AllocationRule[];
  setRules: (rules: AllocationRule[]) => void;
  taskColumns: string[];
  workerColumns: string[];
}

export default function RuleManager({
  rules,
  setRules,
  taskColumns,
  workerColumns,
}: RuleManagerProps) {
  // Controlled inputs
  const [taskField, setTaskField] = useState("");
  const [taskOperator, setTaskOperator] = useState("=");
  const [taskValue, setTaskValue] = useState("");

  const [workerField, setWorkerField] = useState("");
  const [workerOperator, setWorkerOperator] = useState("=");
  const [workerValue, setWorkerValue] = useState("");

  const [maxTasks, setMaxTasks] = useState("");
  const [priority, setPriority] = useState("1");

  const handleAddRule = () => {
    if (!taskField || !taskValue || !workerField || !workerValue) {
      alert("Please fill in all rule fields.");
      return;
    }

    const newRule: AllocationRule = {
      id:
        Date.now().toString(36) +
        Math.random().toString(36).substring(2, 8),
      taskFilter: {
        field: taskField,
        operator:
          taskOperator as AllocationRule["taskFilter"]["operator"],
        value: taskValue,
      },
      workerFilter: {
        field: workerField,
        operator:
          workerOperator as AllocationRule["workerFilter"]["operator"],
        value: workerValue,
      },
      maxTasksPerWorker: parseInt(maxTasks || "1", 10),
      priority: parseInt(priority || "1", 10),
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
    setPriority("1");
  };

  return (
    <div className="w-full bg-[#1B1B1B]/80 flex max-w-full gap-3 p-6 rounded-lg shrink-0">
      <div className="w-2/3">
        <h2 className="text-xl font-medium mb-4">Allocate your Custom Rules</h2>
        <div className="flex flex-wrap gap-4 mb-4 flex-col">
          {/* Task and Worker Filter */}
          <div className="grid grid-cols-3 gap-7">
            {/* Task Filter */}
            <div className="flex flex-col">
              <label className="text-lg">Task Field</label>
              <select
                className="bg-[#6C6C6C] text-white px-2 py-2 border-none mt-1 rounded max-h-9"
                value={taskField}
                onChange={(e) => setTaskField(e.target.value)}
              >
                <option value="">Select Field</option>
                {taskColumns.map((col) => (
                  <option key={col} value={col}>
                    {col}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label className="text-lg">Operator</label>
              <select
                className="bg-[#6C6C6C] text-white px-2 py-2 border-none mt-1 rounded max-h-9"
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
              <label className="text-lg">Value</label>
              <input
                className="bg-[#6C6C6C] text-white px-2 py-2 border-none mt-1 rounded max-h-9"
                value={taskValue}
                onChange={(e) => setTaskValue(e.target.value)}
                placeholder="e.g., 2"
              />
            </div>

            {/* Worker Filter */}
            <div className="flex flex-col">
              <label className="text-lg">Worker Field</label>
              <select
                className="bg-[#6C6C6C] text-white px-2 py-2 border-none mt-1 rounded max-h-9"
                value={workerField}
                onChange={(e) => setWorkerField(e.target.value)}
              >
                <option value="">Select Field</option>
                {workerColumns.map((col) => (
                  <option key={col} value={col}>
                    {col}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label className="text-lg">Operator</label>
              <select
                className="bg-[#6C6C6C] text-white px-2 py-2 border-none mt-1 rounded max-h-9"
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
              <label className="text-lg">Value</label>
              <input
                className="bg-[#6C6C6C] text-white px-2 py-2 border-none mt-1 rounded max-h-9"
                value={workerValue}
                onChange={(e) => setWorkerValue(e.target.value)}
                placeholder="e.g., Senior"
              />
            </div>
          </div>

          {/* Max Tasks */}
          <div className="flex flex-col">
            <label className="text-lg">Max Tasks Per Worker</label>
            <input
              className="bg-[#6C6C6C] text-white px-2 py-2 border-none mt-1 rounded max-h-9"
              type="number"
              min="1"
              value={maxTasks}
              onChange={(e) => setMaxTasks(e.target.value)}
              placeholder="e.g., 2"
            />
          </div>

          {/* Priority */}
          <div className="flex flex-col">
            <label className="text-lg">Priority (1–10)</label>
            <input
              className="bg-[#6C6C6C] text-white px-2 py-2 border-none mt-1 rounded max-h-9"
              type="number"
              min="1"
              max="10"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              placeholder="e.g., 5"
            />
          </div>
        </div>
        <button
          className="bg-green-600 text-white px-4 py-2 text-lg rounded font-semibold hover:bg-green-500"
          onClick={handleAddRule}
        >
          Add Rule
        </button>
      </div>

      {/* Rules List */}
      <div className="w-1/3 px-5 py-3 overflow-y-auto max-h-[340px]">
        {rules.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Current Rules:</h3>
            <ul className="list-disc ml-4">
              {rules
                .slice()
                .sort((a, b) => b.priority - a.priority)
                .map((r, idx) => (
                  <li key={idx} className="text-md">
                    Priority {r.priority} — Task [{r.taskFilter.field}{" "}
                    {r.taskFilter.operator} {r.taskFilter.value}] & Worker [{" "}
                    {r.workerFilter.field} {r.workerFilter.operator}{" "}
                    {r.workerFilter.value}] — Max Tasks:{" "}
                    {r.maxTasksPerWorker}
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
