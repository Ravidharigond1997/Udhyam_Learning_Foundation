import React from "react";
import {
  Box,
  Typography,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Alert,
} from "@mui/material";
import api from "../api";
import CsvPreview from "../components/CsvPreview";
import Papa from "papaparse";
import * as XLSX from "xlsx";

export default function UploadPage() {
  const [type, setType] = React.useState<"student" | "teacher">("student");
  const [file, setFile] = React.useState<File | null>(null);
  const [previewRows, setPreviewRows] = React.useState<any[] | null>(null);
  const [result, setResult] = React.useState<any | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    setResult(null);
    setError(null);
    const f = e.target.files?.[0] ?? null;
    setFile(f);
    setPreviewRows(null);
    if (!f) return;

    const ext = f.name.split(".").pop()?.toLowerCase();
    if (ext === "csv") {
      const reader = new FileReader();
      reader.onload = () => {
        const txt = String(reader.result ?? "");
        const parsed = Papa.parse(txt, { header: true, skipEmptyLines: true });
        setPreviewRows(parsed.data as any[]);
      };
      reader.readAsText(f);
    } else if (ext === "xls" || ext === "xlsx") {
      const reader = new FileReader();
      reader.onload = () => {
        const wb = XLSX.read(new Uint8Array(reader.result as ArrayBuffer), { type: "array" });
        const sheet = wb.Sheets[wb.SheetNames[0]];
        const data = XLSX.utils.sheet_to_json(sheet, { defval: "" }) as any[];
        setPreviewRows(data);
      };
      reader.readAsArrayBuffer(f);
    } else {
      setError("Unsupported file type. Use CSV or XLS/XLSX");
    }
  }

  async function handleUpload() {
    setError(null);
    setResult(null);
    if (!file) {
      setError("Please select a file.");
      return;
    }
    const fd = new FormData();
    fd.append("file", file, file.name);
    try {
      const resp = await api.post(`/api/upload?type=${type}`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResult(resp.data);
      // clear file input
      if (inputRef.current) {
        inputRef.current.value = "";
      }
      setFile(null);
      setPreviewRows(null);
    } catch (err: any) {
      setError(err?.response?.data?.error ?? err.message ?? "Upload failed");
    }
  }

  return (
    <Box>
      <Typography variant="h5">Direct Upload (Approved Data)</Typography>

      <FormControl sx={{ mt: 2, mb: 2, minWidth: 200 }}>
        <InputLabel>Type</InputLabel>
        <Select value={type} label="Type" onChange={(e) => setType(e.target.value as any)}>
          <MenuItem value="student">Student</MenuItem>
          <MenuItem value="teacher">Teacher</MenuItem>
        </Select>
      </FormControl>

      <Box>
        <input ref={inputRef} type="file" onChange={handleFileChange} />
        <Box sx={{ mt: 2 }}>
          <Button variant="contained" onClick={handleUpload} disabled={!file}>
            Upload & Seed
          </Button>
        </Box>
      </Box>

      {error && (
        <Box sx={{ mt: 2 }}>
          <Alert severity="error">{error}</Alert>
        </Box>
      )}

      {previewRows && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle1">Preview (first rows)</Typography>
          <CsvPreview rows={previewRows} />
        </Box>
      )}

      {result && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6">Upload Result</Typography>
          <pre style={{ whiteSpace: "pre-wrap" }}>{JSON.stringify(result, null, 2)}</pre>
        </Box>
      )}
    </Box>
  );
}
