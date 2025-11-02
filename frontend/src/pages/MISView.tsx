import React from "react";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import api from "../api";
import { Student, Teacher } from "../types";

export default function MISView() {
  const [tab, setTab] = React.useState(0);
  const [students, setStudents] = React.useState<Student[]>([]);
  const [teachers, setTeachers] = React.useState<Teacher[]>([]);

  React.useEffect(() => {
    fetchStudents();
    fetchTeachers();
  }, []);

  async function fetchStudents() {
    const r = await api.get("/api/mis/students");
    setStudents(r.data);
  }

  async function fetchTeachers() {
    const r = await api.get("/api/mis/teachers");
    setTeachers(r.data);
  }

  return (
    <Box>
      <Typography variant="h5">MIS View</Typography>

      <Tabs value={tab} onChange={(e, v) => setTab(v)} sx={{ mt: 2 }}>
        <Tab label={`Students (${students.length})`} />
        <Tab label={`Teachers (${teachers.length})`} />
      </Tabs>

      {tab === 0 && (
        <Box sx={{ mt: 2 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Class</TableCell>
                <TableCell>Academic Year</TableCell>
                <TableCell>Student ID</TableCell>
                <TableCell>School Code</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((s) => (
                <TableRow key={s.id}>
                  <TableCell>{s.id}</TableCell>
                  <TableCell>{s.name}</TableCell>
                  <TableCell>{s.class}</TableCell>
                  <TableCell>{s.academic_year}</TableCell>
                  <TableCell>{s.student_id}</TableCell>
                  <TableCell>{s.school_code}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      )}

      {tab === 1 && (
        <Box sx={{ mt: 2 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Teacher ID</TableCell>
                <TableCell>Academic Year</TableCell>
                <TableCell>School Code</TableCell>
                <TableCell>Designation</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {teachers.map((t) => (
                <TableRow key={t.id}>
                  <TableCell>{t.id}</TableCell>
                  <TableCell>{t.name}</TableCell>
                  <TableCell>{t.teacher_id}</TableCell>
                  <TableCell>{t.academic_year}</TableCell>
                  <TableCell>{t.school_code}</TableCell>
                  <TableCell>{t.designation}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      )}
    </Box>
  );
}
