import express from "express";
import { uploadData } from "../controllers/uploadController.js";
const router = express.Router();

router.post("/", uploadData);
export default router;
