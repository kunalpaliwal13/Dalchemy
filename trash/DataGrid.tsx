// components/DataGrid.tsx
"use client";

import React, { useState} from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnDef,
} from "@tanstack/react-table";
import { validateEntities, ValidationError } from "../lib/validateData";

interface DataGridProps {
  data: any[];
  onEdit: (rowIndex: number, key: string, value: any) => void;
  validationErrors: {
    rowIndex: number;
    field: string;
    message: string;
  }[];
}


export default function DataGrid({ data, onEdit }: DataGridProps) {
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);
  if (!data || data.length === 0) {
    return <div className="text-sm text-gray-500">No data to display.</div>;
  }

  // Dynamically infer columns
  const columns = React.useMemo<ColumnDef<any>[]>(
    () =>
      Object.keys(data[0]).map((key) => ({
        accessorKey: key,
        header: key,
       cell: ({ row, column, getValue }) => {
  const key = column.id;  // IMPORTANT: get field name from column.id

  const error = validationErrors.find(
    (e) => e.rowIndex === row.index && e.field === key
  );

  return (
    <div className="relative group">
      <input
        className={`border p-1 w-full text-xs ${
          error ? "border-red-500 bg-red-50" : "border-gray-300"
        }`}
        defaultValue={getValue() as string}
        onBlur={(e) => {
          onEdit(row.index, key, e.target.value);
        }}
      />
      {error && (
        <div
          className="absolute z-10 hidden group-hover:block bg-red-600 text-white text-xs rounded px-2 py-1 top-full mt-1 whitespace-normal max-w-xs"
        >
          {error.message}
        </div>
      )}
    </div>
  );
},

      })),
    [data, onEdit]
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-x-auto border rounded">
      <table className="min-w-full divide-y divide-gray-200 text-xs">
        <thead className="bg-gray-50">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="px-2 py-1 text-left font-semibold">
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="bg-white">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-2 py-1">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
