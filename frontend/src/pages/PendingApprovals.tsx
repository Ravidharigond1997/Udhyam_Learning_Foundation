import React from "react";
import { Box, Typography, Card, CardContent, Button, Stack } from "@mui/material";
import api from "../api";
import { ApprovalRequest } from "../types";

export default function PendingApprovals() {
  const [list, setList] = React.useState<ApprovalRequest[]>([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);
    try {
      const r = await api.get("/api/approvals/pending");
      setList(r.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function approve(id: number) {
    await api.post(`/api/approvals/${id}/approve`);
    await load();
  }

  async function reject(id: number) {
    const remarks = window.prompt("Enter remarks (optional)");
    await api.post(`/api/approvals/${id}/reject`, { remarks });
    await load();
  }

  return (
    <Box>
      <Typography variant="h5">Pending Approvals</Typography>
      <Typography variant="body2" sx={{ mb: 2 }}>
        {loading ? "Loading..." : `${list.length} pending`}
      </Typography>

      <Stack spacing={2}>
        {list.map((item) => (
          <Card key={item.id}>
            <CardContent>
              <Typography>
                <strong>Type:</strong> {item.record_type}
              </Typography>
              <Typography sx={{ mt: 1 }}>
                <strong>Payload:</strong>
              </Typography>
              <pre style={{ whiteSpace: "pre-wrap" }}>{JSON.stringify(item.payload, null, 2)}</pre>

              <Box sx={{ mt: 2 }}>
                <Button variant="contained" onClick={() => approve(item.id)} sx={{ mr: 1 }}>
                  Approve
                </Button>
                <Button variant="outlined" color="error" onClick={() => reject(item.id)}>
                  Reject
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Box>
  );
}
