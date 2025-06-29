import { GoogleGenerativeAI } from "@google/generative-ai";
import { AllocationRule } from "./types";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function parseRuleWithGemini(input: string): Promise<AllocationRule | null> {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const prompt = `Given this natural language rule, output a JSON object matching this TypeScript interface:

interface AllocationRule {
  taskFilter: { field: string; operator: string; value: string };
  workerFilter: { field: string; operator: string; value: string };
  maxTasksPerWorker: number;
}

Example:
Input: "Tasks with Duration > 2 and workers in TeamAlpha with max 3 tasks each"
Output:
{
  "taskFilter": { "field": "Duration", "operator": ">", "value": "2" },
  "workerFilter": { "field": "WorkerGroup", "operator": "=", "value": "TeamAlpha" },
  "maxTasksPerWorker": 3
}

Input: "${input}"
Output:
`;

  const result = await model.generateContent(prompt);
  const text = result.response.text().trim();

  try {
    const json = JSON.parse(text);
    return json as AllocationRule;
  } catch (e) {
    console.error("Failed to parse Gemini response:", e, text);
    return null;
  }
}
