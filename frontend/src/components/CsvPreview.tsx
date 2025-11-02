import React from "react";
import { Box, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

type Props = {
  rows: Record<string, any>[];
  limit?: number;
};

export default function CsvPreview({ rows, limit = 10 }: Props) {
  if (!rows || rows.length === 0) return <div>No preview</div>;
  const keys = Object.keys(rows[0]);

  return (
    <Box sx={{ maxHeight: 300, overflow: "auto", mt: 2 }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            {keys.map((k) => (
              <TableCell key={k}>{k}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.slice(0, limit).map((r, idx) => (
            <TableRow key={idx}>
              {keys.map((k) => (
                <TableCell key={k + idx}>{String(r[k])}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}
