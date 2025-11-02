import express from "express";
import { getPendingApprovals, approveRequest, rejectRequest } from "../controllers/approvalController.js";

const router = express.Router();
router.get("/pending", getPendingApprovals);
router.post("/:id/approve", approveRequest);
router.post("/:id/reject", rejectRequest);

export default router;
