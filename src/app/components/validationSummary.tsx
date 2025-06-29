"use client";

import React from "react";

interface ValidationItem {
  rowIndex: number;
  field: string;
  message: string;
}

export default function ValidationSummary({
  title,
  errors,
}: {
  title: string;
  errors: Record<string, string>;
}) {
  // Convert error map to array
  const errorList: ValidationItem[] = Object.entries(errors).map(([key, message]) => {
    const [rowIndex, field] = key.split("-");
    return {
      rowIndex: parseInt(rowIndex, 10) + 1, // 1-based row numbers
      field,
      message,
    };
  });

  if (errorList.length === 0) return null;

  return (
    <div className="bg-red-900/30 border border-red-600 p-4 rounded mt-2 text-md w-full overflow-x-auto">
      <h3 className="text-red-300 font-semibold mb-2">{title} Validation Summary</h3>
      <table className="w-full text-left text-red-200">
        <thead className="border-b border-red-600">
          <tr>
            <th className="pr-4">Row</th>
            <th className="pr-4">Field</th>
            <th>Error</th>
          </tr>
        </thead>
        <tbody>
          {errorList.map((err, i) => (
            <tr key={i} className="border-b border-red-800/40">
              <td className="pr-4">{err.rowIndex}</td>
              <td className="pr-4">{err.field}</td>
              <td>{err.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
