export interface RuleCondition {
  field: string;
  operator: "=" | "!=" | ">" | "<" | ">=" | "<=";
  value: string;
}

export interface AllocationRule {
  id: string;
  taskFilter: RuleCondition;
  workerFilter: RuleCondition;
  maxTasksPerWorker?: number;
}