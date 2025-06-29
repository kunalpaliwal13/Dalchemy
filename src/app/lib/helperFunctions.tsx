export function toCsv(columns: string[], rows: any[]): string {
  const header = columns.join(",");
  const data = rows.map(row =>
    columns.map(col => (row[col] !== undefined ? JSON.stringify(row[col]) : "")).join(",")
  );
  return [header, ...data].join("\n");
}

export function downloadFile(content: string, fileName: string) {
  const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function formatErrors(validationErrors: ReturnType<typeof validateEntities>): Record<string, string> {
  const errorMap: Record<string, string> = {};
  validationErrors.forEach((err) => {
    errorMap[`${err.rowIndex}-${err.field}`] = err.message;
  });
  return errorMap;
}


