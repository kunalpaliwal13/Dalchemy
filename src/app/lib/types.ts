export interface RuleCondition {
  field: string;
  operator: "=" | "!=" | ">" | "<" | ">=" | "<=";
  value: string;
}

export interface AllocationRule {
  id: string;
  taskFilter: { field: string; operator: string; value: string };
  workerFilter: { field: string; operator: string; value: string };
  maxTasksPerWorker: number;
  priority: number; 
}
