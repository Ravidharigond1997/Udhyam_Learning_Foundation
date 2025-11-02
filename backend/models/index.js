import { MisStudent } from "./misStudent.js";
import { MisTeacher } from "./misTeacher.js";
import { ApprovalRequest } from "./approvalRequest.js";
import { AuditLog } from "./auditLog.js";
import { sequelize } from "../config/db.js";

export { sequelize, MisStudent, MisTeacher, ApprovalRequest, AuditLog };
