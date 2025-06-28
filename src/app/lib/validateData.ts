// lib/validateData.ts
import { clientSchema, workerSchema, taskSchema } from "./validationSchemas";
import { ZodError } from "zod";

export interface ValidationError {
  entity: "clients" | "workers" | "tasks";
  rowIndex: number;
  field: string;
  message: string;
}

export function validateEntities(
  entity: "clients" | "workers" | "tasks",
  data: any[]
): ValidationError[] {
  const errors: ValidationError[] = [];

  data.forEach((row, index) => {
    try {
      if (entity === "clients") {
        clientSchema.parse(row);
      }
      if (entity === "workers") {
        workerSchema.parse(row);
      }
      if (entity === "tasks") {
        taskSchema.parse(row);
      }
    } catch (err) {
      if (err instanceof ZodError) {
        err.errors.forEach((e) => {
          errors.push({
            entity,
            rowIndex: index,
            field: e.path.join("."),
            message: e.message,
          });
        });
      }
    }
  });

  return errors;
}
