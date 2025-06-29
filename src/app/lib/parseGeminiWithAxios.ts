import axios from "axios";
import { AllocationRule } from "./types";

export async function parseRuleWithGemini(input: string): Promise<AllocationRule | null> {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

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

  try {
    const res = await axios.post(endpoint, {
      contents: [
        {
          parts: [{ text: prompt }]
        }
      ]
    });

    const text = res.data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
    if (!text) {
      console.error("Empty response from Gemini", res.data);
      return null;
    }

    // Some Gemini responses wrap JSON in ```json blocks, clean them:
    const cleanText = text
      .replace(/^```json/i, "")
      .replace(/^```/, "")
      .replace(/```$/, "")
      .trim();

    const json = JSON.parse(cleanText);
    return json as AllocationRule;
  } catch (err) {
    console.error("Gemini API error:", err);
    return null;
  }
}
