import Papa from "papaparse";
import XLSX from "xlsx";

export async function parseFileBuffer(filename, buffer) {
  const ext = filename.split(".").pop().toLowerCase();

  if (ext === "csv") {
    const text = buffer.toString("utf8");
    const parsed = Papa.parse(text, { header: true, skipEmptyLines: true });
    return parsed.data;
  } else if (["xls", "xlsx"].includes(ext)) {
    const workbook = XLSX.read(buffer, { type: "buffer" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(sheet, { defval: "" });
    return data;
  }

  throw new Error("Unsupported file type");
}
