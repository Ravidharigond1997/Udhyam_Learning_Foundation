import React from "react";
import { Box, Typography, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import api from "../api";
import { AuditLog } from "../types";

export default function AuditLog() {
  const [logs, setLogs] = React.useState<AuditLog[]>([]);

  React.useEffect(() => {
    load();
  }, []);

  async function load() {
    const r = await api.get("/api/mis/audit");
    setLogs(r.data);
  }

  return (
    <Box>
      <Typography variant="h5">Audit Logs</Typography>
      <Table size="small" sx={{ mt: 2 }}>
        <TableHead>
          <TableRow>
            <TableCell>Time</TableCell>
            <TableCell>Action</TableCell>
            <TableCell>Entity</TableCell>
            <TableCell>Entity ID</TableCell>
            <TableCell>Performed By</TableCell>
            <TableCell>Details</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {logs.map((l) => (
            <TableRow key={l.id}>
              <TableCell>{new Date(l.createdAt || "").toLocaleString()}</TableCell>
              <TableCell>{l.action}</TableCell>
              <TableCell>{l.entity}</TableCell>
              <TableCell>{l.entityId}</TableCell>
              <TableCell>{l.performedBy}</TableCell>
              <TableCell>
                <pre style={{ whiteSpace: "pre-wrap", margin: 0 }}>{JSON.stringify(l.details, null, 2)}</pre>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}
