// lib/validationSchemas.ts
import { z } from "zod";

export const clientSchema = z.object({
  ClientID: z.string().min(1),
  ClientName: z.string().min(1),
  PriorityLevel: z.coerce.number().int().min(1).max(5),
  RequestedTaskIDs: z.string(), // We'll parse this further in logic
  GroupTag: z.string(),
  AttributesJSON: z.string().refine(
    (val) => {
      try {
        JSON.parse(val);
        return true;
      } catch {
        return false;
      }
    },
    { message: "Invalid JSON" }
  ),
});

export const workerSchema = z.object({
  WorkerID: z.string().min(1),
  WorkerName: z.string().min(1),
  Skills: z.string(), // Comma-separated
  AvailableSlots: z.string().refine(
    (val) => {
      try {
        const parsed = JSON.parse(val);
        return Array.isArray(parsed) && parsed.every((n) => typeof n === "number");
      } catch {
        return false;
      }
    },
    { message: "Invalid array" }
  ),
  MaxLoadPerPhase: z.coerce.number().min(1),
  WorkerGroup: z.string(),
  QualificationLevel: z.string(),
});

export const taskSchema = z.object({
  TaskID: z.string().min(1),
  TaskName: z.string().min(1),
  Category: z.string(),
  Duration: z.coerce.number().min(1),
  RequiredSkills: z.string(),
  PreferredPhases: z.string(), // We'll normalize later
  MaxConcurrent: z.coerce.number().min(1),
});
