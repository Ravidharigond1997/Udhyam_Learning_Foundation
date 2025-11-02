import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import fileUpload from "express-fileupload";
import { sequelize } from "./config/db.js";

import uploadRoutes from "./routes/uploadRoutes.js";
import approvalRoutes from "./routes/approvalRoutes.js";
import misRoutes from "./routes/misRoutes.js";
import { ApprovalRequest } from "./models/index.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(fileUpload());

// Routes
app.use("/api/upload", uploadRoutes);
app.use("/api/approvals", approvalRoutes);
app.use("/api/mis", misRoutes);

const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await sequelize.sync();
    const count = await ApprovalRequest.count();
    if (count === 0) {
      await ApprovalRequest.create({
        record_type: "student",
        payload: {
          name: "Dummy Student",
          class: "10",
          academic_year: "2024-25",
          student_id: "S-1001",
          school_code: "SCH-01",
        },
      });
      await ApprovalRequest.create({
        record_type: "teacher",
        payload: {
          name: "Dummy Teacher",
          teacher_id: "T-201",
          academic_year: "2024-25",
          school_code: "SCH-01",
          designation: "PGT",
        },
      });
    }
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  } catch (err) {
    console.error("❌ DB Connection Failed:", err);
  }
})();
