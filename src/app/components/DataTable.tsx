import React from "react";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

interface DataTableProps {
  title: string;
  columns: string[];
  rows: Array<Record<string, any>>;
  errors?: Record<string, string>; // key = `${rowIndex}-${column}`
}

const DataTable: React.FC<DataTableProps> = ({
  title,
  columns,
  rows,
  errors = {},
}) => {
  return (
    <div className="w-[100%] mb-10">
      <h2 className="text-xl font-semibold text-white mb-2">{title}</h2>
      <div className="overflow-x-auto rounded-lg border border-gray-700 max-h-[40vh] overflow-y-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-black">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                #
              </th>
              {columns.map((col) => (
                <th
                  key={col}
                  className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                >
                  {col}
                </th>
              ))}
              {/* Notes column */}
              <th
                className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
              >
                Notes
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {rows.map((row, rowIdx) => (
              <tr
                key={rowIdx}
                className={`${
                  rowIdx % 2 === 0 ? "bg-[#1f1f1f]" : "bg-[#303030]"
                }`}
              >
                <td className="px-4 py-2 text-xl text-gray-100">{rowIdx + 1}</td>
                {columns.map((col) => {
                  const key = `${rowIdx}-${col}`;
                  const hasError = errors[key];
                  return (
                    <td
                      key={col}
                      className={`relative px-4 py-2 text-md font-semibold ${
                        hasError
                          ? "bg-red-600/30 text-red-300 font-semibold"
                          : "text-gray-200"
                      }`}
                      data-tooltip-id={hasError ? `tooltip-${key}` : undefined}
                    >
                      {typeof row[col] === "object" && row[col] !== null
                        ? JSON.stringify(row[col], null, 0)
                        : String(row[col] ?? "")}

                      {hasError && (
                        <Tooltip
                          id={`tooltip-${key}`}
                          place="top"
                          style={{
                            background: "#2DC653",
                            color: "black",
                            padding: "6px 12px",
                            borderRadius: "6px",
                            fontSize: "0.85rem",
                            zIndex: "10000",
                          }}
                        >
                          {hasError}
                        </Tooltip>
                      )}
                    </td>
                  );
                })}
                {/* Notes cell */}
                <td className="px-4 py-2 text-md font-semibold text-white max-w-[300px] whitespace-pre-wrap">
                  {(() => {
                    // Gather all error messages for this row with column names
                    const rowErrorMessages = Object.entries(errors)
                      .filter(([key]) => key.startsWith(`${rowIdx}-`))
                      .map(([key, message]) => {
                        const columnName = key.split("-")[1];
                        return `${columnName}: ${message}`;
                      });

                    // Existing Notes field, if any
                    const existingNote =
                      typeof row["Notes"] === "string" ? row["Notes"] : "";

                    if (rowErrorMessages.length === 0 && !existingNote) {
                      return ""; // No notes
                    }

                    if (rowErrorMessages.length > 0 && existingNote) {
                      return `${existingNote}\n${rowErrorMessages.join("\n")}`;
                    }

                    if (rowErrorMessages.length > 0) {
                      return rowErrorMessages.join("\n");
                    }

                    return existingNote;
                  })()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
