"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { IoCloseOutline, IoCloudUploadSharp } from "react-icons/io5";
import { TiTickOutline } from "react-icons/ti";
import DataTable from "../components/DataTable";
import { parseFile } from "../lib/fileUtils";
import { validateEntities } from "../lib/validateData";
import { AllocationRule } from "../lib/types";
import RuleManager from "../components/RuleManager";
import { allocateTasks, Assignment } from "../lib/allocateTasks";
import CustomCursor from "../components/CustomCursor";
import { downloadFile, formatErrors, toCsv } from "../lib/helperFunctions";
import ValidationSummary from "../components/validationSummary";

export default function DataPage() {
  // Rules
  const [rules, setRules] = useState<AllocationRule[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  //alert
  const [alert, setAlert] = useState(""); //not working
  // files
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

  const [priorities, setPriorities] = useState({
    priorityLevelWeight: 50,
    requestedTasksWeight: 50,
    fairnessWeight: 50,
  });


  const handleGenerateAssignments = () => {
  if (taskRows.length === 0 || workerRows.length === 0) {
    setAlert("Please upload both Tasks and Workers data.");
    return;
  }
  const newAssignments = allocateTasks(taskRows, workerRows, rules);
  if (newAssignments.length === 0) {
    setAlert("No assignments generated. Check your rules and data.");
    return;
  }

  const csvContent = [
    ["TaskID", "TaskName", "WorkerID", "WorkerName"],
    ...newAssignments.map((a) => [
      a.task.TaskID || "",
      a.task.TaskName || "",
      a.worker.WorkerID || "",
      a.worker.WorkerName || "",
    ]),
  ]
    .map((row) => row.join(","))
    .join("\n");
  
  downloadFile(csvContent, "assignments.csv");

  // Export cleaned clients/workers/tasks
  if (clientRows.length > 0) {
    const clientCsv = toCsv(clientColumns, clientRows);
    downloadFile(clientCsv, "cleaned_clients.csv");
  }
  if (workerRows.length > 0) {
    const workerCsv = toCsv(workerColumns, workerRows);
    downloadFile(workerCsv, "cleaned_workers.csv");
  }
  if (taskRows.length > 0) {
    const taskCsv = toCsv(taskColumns, taskRows);
    downloadFile(taskCsv, "cleaned_tasks.csv");
  }

  // Export rules.json
  const ruleConfig = {
    rules,
    priorities
  };
  const jsonBlob = new Blob([JSON.stringify(ruleConfig, null, 2)], { type: "application/json" });
  const jsonUrl = URL.createObjectURL(jsonBlob);
  const jsonLink = document.createElement("a");
  jsonLink.href = jsonUrl;
  jsonLink.setAttribute("download", "rules.json");
  document.body.appendChild(jsonLink);
  jsonLink.click();
  document.body.removeChild(jsonLink);

  setAlert("Assignments, cleaned CSVs, and rules.json generated successfully.");
  };


  // Automatically hide alert after 5 sec
  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => {
        setAlert("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

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

      <div className="flex">
        <Link href="/">
          <IoMdArrowRoundBack className="text-white ml-4 mt-4 text-2xl border-2 hover:border-green-400 border-white h-10 p-2 rounded-full hover:bg-green-400 w-10" />
        </Link>
        <div
          className="relative top-3 w-screen h-10 flex justify-center"
          style={{ zIndex: "1000" }}
        >
          {alert && (
            <div className="bg-white w-auto p-5 py-6 pr-1 flex justify-center items-center rounded-lg relative">
              <TiTickOutline className="text-green-400 text-xl border-2 rounded-full mr-2 border-green-300" />
              {alert}
              <IoCloseOutline
                className="text-2xl ml-3 text-gray-500 cursor-pointer hover:text-black"
                onClick={() => setAlert("")}
              />
            </div>
          )}
        </div>
      </div>

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
        <div className="mt-3 p-30 w-full">
          <RuleManager
            rules={rules}
            setRules={setRules}
            taskColumns={taskColumns}
            workerColumns={workerColumns}
          />
          <div className="mt-6 w-[50%]">
          <h2 className="text-2xl font-semibold mb-2">Set Prioritization Weights</h2>

          <div className="space-y-4">
            {Object.keys(priorities).map((key) => (
              <div key={key}>
                <label className="block text-lg font-medium text-gray-300 capitalize">
                  {key.replace(/([A-Z])/g, " $1")}
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={priorities[key as keyof typeof priorities]}
                  onChange={(e) => {
                    setPriorities((prev) => ({
                      ...prev,
                      [key]: Number(e.target.value),
                    }));
                  }}
                  className="w-full accent-white hover:border-none"
                />
                <span className="text-lg text-gray-400">{priorities[key as keyof typeof priorities]}%</span>
              </div>
            ))}
          </div>
        </div>

          <button
            className="bg-green-600 hover:bg-green-500 text-white text-lg px-4 py-2 rounded font-semibold mt-6"
            onClick={handleGenerateAssignments}
          >
            Generate Assignments
          </button>
        </div>

        {/* Data Tables */}
        <div className="flex flex-col gap-10 mb-20 px-30">
          <ValidationSummary
            title="Clients"
            errors={clientErrors}
          />
          {clientsFile && (
            <DataTable
              title="Clients Data"
              columns={clientColumns}
              rows={clientRows}
              errors={clientErrors}
            />
          )}
            <ValidationSummary
              title="Workers"
              errors={workerErrors}
            />
          {workersFile && (
            <DataTable
              title="Workers Data"
              columns={workerColumns}
              rows={workerRows}
              errors={workerErrors}
            />
          )}
            <ValidationSummary
              title="Tasks"
              errors={taskErrors}
            />
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
