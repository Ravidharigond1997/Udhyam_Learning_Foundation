import express from "express";
import { getStudents, getTeachers, getAuditLogs } from "../controllers/misController.js";

const router = express.Router();
router.get("/students", getStudents);
router.get("/teachers", getTeachers);
router.get("/audit", getAuditLogs);

export default router;
