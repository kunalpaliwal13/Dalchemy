import Papa from "papaparse";
import * as XLSX from "xlsx";

export async function parseFile(file: File): Promise<any[]> {
  const ext = file.name.split(".").pop()?.toLowerCase();
  
  if (ext === "csv") {
    return new Promise((resolve, reject) => {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => resolve(results.data),
        error: (err) => reject(err),
      });
    });
  }
  
  if (ext === "xlsx") {
    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data, { type: "array" });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    return XLSX.utils.sheet_to_json(worksheet, { defval: "" });
  }
  
  throw new Error("Unsupported file type.");
}
