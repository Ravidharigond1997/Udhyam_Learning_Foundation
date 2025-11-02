import React from "react";
import { Container, AppBar, Toolbar, Typography, Button } from "@mui/material";
import UploadPage from "./pages/UploadPage";
import PendingApprovals from "./pages/PendingApprovals";
import MISView from "./pages/MISView";
import AuditLog from "./pages/AuditLog";

export default function App() {
  const [view, setView] = React.useState<
    "upload" | "pending" | "mis" | "audit"
  >("upload");

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Admin MIS
          </Typography>
          <Button color="inherit" onClick={() => setView("upload")}>
            Upload
          </Button>
          <Button color="inherit" onClick={() => setView("pending")}>
            Pending
          </Button>
          <Button color="inherit" onClick={() => setView("mis")}>
            MIS
          </Button>
          <Button color="inherit" onClick={() => setView("audit")}>
            Audit
          </Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4 }}>
        {view === "upload" && <UploadPage />}
        {view === "pending" && <PendingApprovals />}
        {view === "mis" && <MISView />}
        {view === "audit" && <AuditLog />}
      </Container>
    </>
  );
}
