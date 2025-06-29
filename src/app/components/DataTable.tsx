import React, { useState, useEffect } from "react";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

interface DataTableProps {
  title: string;
  columns: string[];
  rows: Array<Record<string, any>>;
  errors?: Record<string, string>;
  onCellChange?: (rowIndex: number, column: string, newValue: any) => void;
}

const DataTable: React.FC<DataTableProps> = ({
  title,
  columns,
  rows,
  errors = {},
  onCellChange,
}) => {
  const [query, setQuery] = useState("");
  const [filteredRows, setFilteredRows] = useState(rows);

  useEffect(() => {
    setFilteredRows(filterRows(query, rows, columns));
  }, [query, rows, columns]);

  return (
    <div className="w-[100%] mb-10">
      <h2 className="text-xl font-semibold text-white mb-2">{title}</h2>

      <input
        type="text"
        placeholder="Search with natural language (e.g., PriorityLevel > 3)"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-2 mb-4 bg-black border border-gray-700 text-white rounded"
      />

      <div className="overflow-x-auto rounded-lg border border-gray-700 max-h-[40vh] overflow-y-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-black">
            <tr>
              <th className="px-4 py-2 text-left text-md font-medium text-gray-400 tracking-wider">
                #
              </th>
              {columns.map((col) => (
                <th
                  key={col}
                  className="px-4 py-2 text-left text-md font-medium text-gray-400  tracking-wider"
                >
                  {col}
                </th>
              ))}
              <th
                className="px-4 py-2 text-left text-md font-medium text-gray-400  tracking-wider"
              >
                Notes
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {filteredRows.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length + 2}
                  className="text-center py-4 text-gray-400"
                >
                  No results found.
                </td>
              </tr>
            )}
            {filteredRows.map((row, rowIdx) => (
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
                      {onCellChange ? (
                        <input
                          value={String(row[col] ?? "")}
                          onChange={(e) =>
                            onCellChange(rowIdx, col, e.target.value)
                          }
                          className={`w-full bg-transparent border-b border-gray-600 focus:border-green-500 focus:outline-none ${
                            hasError
                              ? "bg-red-600/30 text-red-300"
                              : "text-gray-200"
                          }`}
                        />
                      ) : (
                        <>
                          {typeof row[col] === "object" && row[col] !== null
                            ? JSON.stringify(row[col], null, 0)
                            : String(row[col] ?? "")}
                        </>
                      )}

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
                <td className="px-4 py-2 text-md font-semibold text-white max-w-[300px] whitespace-pre-wrap">
                  {(() => {
                    const rowErrorMessages = Object.entries(errors)
                      .filter(([key]) => key.startsWith(`${rowIdx}-`))
                      .map(([key, message]) => {
                        const columnName = key.split("-")[1];
                        return `${columnName}: ${message}`;
                      });

                    const existingNote =
                      typeof row["Notes"] === "string" ? row["Notes"] : "";

                    if (rowErrorMessages.length === 0 && !existingNote) {
                      return "";
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

function filterRows(query: string, rows: any[], columns: string[]) {
  if (!query.trim()) return rows;

  const match = query.match(/(\w+)\s*(=|>|<|>=|<=)\s*(.+)/);
  if (match) {
    const [, column, operator, value] = match;
    if (!columns.includes(column)) return rows;

    return rows.filter((row) => {
      const cellValue = row[column];
      if (cellValue == null) return false;

      const numValue = Number(value);
      switch (operator) {
        case "=":
          return String(cellValue).toLowerCase() === value.toLowerCase();
        case ">":
          return Number(cellValue) > numValue;
        case "<":
          return Number(cellValue) < numValue;
        case ">=":
          return Number(cellValue) >= numValue;
        case "<=":
          return Number(cellValue) <= numValue;
        default:
          return false;
      }
    });
  }

  return rows.filter((row) =>
    Object.values(row).some((cell) =>
      String(cell).toLowerCase().includes(query.toLowerCase())
    )
  );
}
