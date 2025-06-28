import { AllocationRule } from "./types";

export interface Assignment {
  task: Record<string, any>;
  worker: Record<string, any>;
}

export function allocateTasks(
  tasks: Record<string, any>[],
  workers: Record<string, any>[],
  rules: AllocationRule[]
): Assignment[] {
  const assignments: Assignment[] = [];
  const workerLoad: Record<string, number> = {};

  for (const rule of rules) {
    // Filter tasks
    const matchingTasks = tasks.filter((t) => {
      const val = t[rule.taskFilter.field];
      return compare(val, rule.taskFilter.operator, rule.taskFilter.value);
    });

    // Filter workers
    const matchingWorkers = workers.filter((w) => {
      const val = w[rule.workerFilter.field];
      return compare(val, rule.workerFilter.operator, rule.workerFilter.value);
    });

    // Assign
    for (const task of matchingTasks) {
      for (const worker of matchingWorkers) {
        const id = worker["WorkerID"];
        const currentLoad = workerLoad[id] || 0;

        if (
          rule.maxTasksPerWorker === undefined ||
          currentLoad < rule.maxTasksPerWorker
        ) {
          assignments.push({ task, worker });
          workerLoad[id] = currentLoad + 1;
          break; // assign to only 1 worker per task
        }
      }
    }
  }

  return assignments;
}

// Helper to compare values
function compare(
  actual: any,
  operator: string,
  expected: string
): boolean {
  if (operator === "=") return String(actual) === expected;
  if (operator === "!=") return String(actual) !== expected;
  if (operator === ">") return Number(actual) > Number(expected);
  if (operator === "<") return Number(actual) < Number(expected);
  if (operator === ">=") return Number(actual) >= Number(expected);
  if (operator === "<=") return Number(actual) <= Number(expected);
  return false;
}
