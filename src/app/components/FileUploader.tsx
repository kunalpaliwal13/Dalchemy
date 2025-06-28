// components/FileUploader.tsx
"use client";

import React, { useRef } from "react";
import { parseFile } from "../lib/fileUtils";

type FileUploaderProps = {
  onDataParsed: (entity: "clients" | "workers" | "tasks", data: any[]) => void;
};

export default function FileUploader({ onDataParsed }: FileUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const { data, error } = await parseFile(file);

    if (error) {
      alert(`Parsing Error: ${error}`);
      return;
    }

    // Try to guess the entity by column headers
    const headers = Object.keys(data[0] || {});
    let entity: "clients" | "workers" | "tasks" | null = null;

    if (headers.includes("ClientID")) entity = "clients";
    else if (headers.includes("WorkerID")) entity = "workers";
    else if (headers.includes("TaskID")) entity = "tasks";

    if (!entity) {
      alert("Unknown file type. Please check headers.");
      return;
    }

    onDataParsed(entity, data);
    e.target.value = ""; // reset file input
  };

  return (
    <div className="border p-4 rounded-lg">
      <input
        ref={inputRef}
        type="file"
        accept=".csv,.xlsx"
        onChange={handleFileChange}
        className="block text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-indigo-50 file:text-indigo-700
          hover:file:bg-indigo-100
        "
      />
    </div>
  );
}
