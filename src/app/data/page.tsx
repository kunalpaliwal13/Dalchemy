"use client";

import Link from "next/link";
import { useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { IoCloudUploadSharp } from "react-icons/io5";
import DataTable from "../components/DataTable";
import { parseFile } from "../lib/fileUtils";
import { validateEntities } from "../lib/validateData";
import { AllocationRule } from "../lib/types";
import RuleManager from "../components/RuleManager";
import { allocateTasks, Assignment } from "../lib/allocateTasks";
import CustomCursor from "../components/CustomCursor";

export default function DataPage() {
  // Rules
  const [rules, setRules] = useState<AllocationRule[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);

  // File Names
  const [clientsFile, setClientsFile] = useState("");
  const [tasksFile, setTasksFile] = useState("");
  const [workersFile, setWorkersFile] = useState("");

  // Data & Errors
  const [clientColumns, setClientColumns] = useState<string[]>([]);
  const [clientRows, setClientRows] = useState<any[]>([]);
  const [clientErrors, setClientErrors] = useState<Record<string, string>>({});

  const [workerColumns, setWorkerColumns] = useState<string[]>([]);
  const [workerRows, setWorkerRows] = useState<any[]>([]);
  const [workerErrors, setWorkerErrors] = useState<Record<string, string>>({});

  const [taskColumns, setTaskColumns] = useState<string[]>([]);
  const [taskRows, setTaskRows] = useState<any[]>([]);
  const [taskErrors, setTaskErrors] = useState<Record<string, string>>({});

  // Convert ValidationError[] to Record
  function formatErrors(validationErrors: ReturnType<typeof validateEntities>): Record<string, string> {
    const errorMap: Record<string, string> = {};
    validationErrors.forEach((err) => {
      errorMap[`${err.rowIndex}-${err.field}`] = err.message;
    });
    return errorMap;
  }

  return (
    <div className="w-screen overflow-x-hidden">
      {/* Background */}
      <div
        className="inset-0 fixed"
        style={{
          background: "#000000",
          backgroundImage: `radial-gradient(circle, rgba(255, 255, 255, 0.2) 1.5px, transparent 1.5px)`,
          backgroundSize: "30px 30px",
          backgroundPosition: "0 0",
          zIndex: "-1",
        }}
      />

      {/* Intro */}
      <Link href="/">
        <IoMdArrowRoundBack className="text-white ml-4 mt-4 text-2xl border-2 hover:border-green-400 border-white h-10 p-2 rounded-full hover:bg-green-400 w-10" />
      </Link>

      <main className="min-h-screen text-white p-10">
        <div className="flex flex-col px-30">
          <h1 className="text-3xl font-bold">Data Workspace</h1>
          <p className="mt-4 text-gray-400">
            Upload CSVs, validate data, create allocation rules, and generate assignments.
          </p>
        </div>

        {/* Upload Inputs */}
        <div className="min-h-[20vh] mt-10 w-full px-30 grid grid-cols-1 md:grid-cols-3 gap-6">
          <FileUploadCard
            title="Clients File"
            fileName={clientsFile}
            onFileParsed={(rows, fileName) => {
              setClientsFile(fileName);
              setClientRows(rows);
              if (rows.length > 0) setClientColumns(Object.keys(rows[0]));
              const validation = validateEntities("clients", rows);
              setClientErrors(formatErrors(validation));
            }}
          />
          <FileUploadCard
            title="Workers File"
            fileName={workersFile}
            onFileParsed={(rows, fileName) => {
              setWorkersFile(fileName);
              setWorkerRows(rows);
              if (rows.length > 0) setWorkerColumns(Object.keys(rows[0]));
              const validation = validateEntities("workers", rows);
              setWorkerErrors(formatErrors(validation));
            }}
          />
          <FileUploadCard
            title="Tasks File"
            fileName={tasksFile}
            onFileParsed={(rows, fileName) => {
              setTasksFile(fileName);
              setTaskRows(rows);
              if (rows.length > 0) setTaskColumns(Object.keys(rows[0]));
              const validation = validateEntities("tasks", rows);
              setTaskErrors(formatErrors(validation));
            }}
          />
        </div>

        {/* Rule Manager */}
        <div className="mt-10 p-30">
          <RuleManager rules={rules} setRules={setRules} />
          <button
            className="bg-green-500 text-black px-4 py-2 rounded font-semibold mt-6"
            onClick={() => {
              const result = allocateTasks(taskRows, workerRows, rules);
              setAssignments(result);
            }}
          >
            Generate Assignments
          </button>
        </div>

        {/* Data Tables */}
        <div className="flex flex-col gap-10 my-20 px-30">
          {clientsFile && (
            <DataTable
              title="Clients Data"
              columns={clientColumns}
              rows={clientRows}
              errors={clientErrors}
            />
          )}
          {workersFile && (
            <DataTable
              title="Workers Data"
              columns={workerColumns}
              rows={workerRows}
              errors={workerErrors}
            />
          )}
          {tasksFile && (
            <DataTable
              title="Tasks Data"
              columns={taskColumns}
              rows={taskRows}
              errors={taskErrors}
            />
          )}
          {assignments.length > 0 && (
            <DataTable
              title="Assignments"
              columns={["TaskID", "WorkerID"]}
              rows={assignments}
            />
          )}
        </div>

        <CustomCursor />
      </main>
    </div>
  );
}

// Reusable Upload Card
function FileUploadCard({
  title,
  fileName,
  onFileParsed,
}: {
  title: string;
  fileName: string;
  onFileParsed: (rows: any[], fileName: string) => void;
}) {
  return (
    <label className="w-full bg-[#1B1B1B]/80 rounded-lg p-5 cursor-pointer">
      <div className="flex">
        <IoCloudUploadSharp className="text-black bg-[#3C3C3C] h-13 w-13 rounded-full p-2" />
        <div className="ml-4">
          <span className="text-lg">{title}</span>
          <p className="text-md">Please upload CSV/XLSX.</p>
          <input
            type="file"
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            className="hidden"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (file) {
                const rows = await parseFile(file);
                onFileParsed(rows, file.name);
              }
            }}
          />
          <div className="bg-white text-gray-950 px-2 mt-2 rounded">
            <i>{fileName || "No file chosen"}</i>
          </div>
        </div>
      </div>
    </label>
  );
}
