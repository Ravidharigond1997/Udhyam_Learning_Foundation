import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const AuditLog = sequelize.define("audit_log", {
  action: DataTypes.STRING,
  entity: DataTypes.STRING,
  entityId: DataTypes.STRING,
  performedBy: DataTypes.STRING,
  details: DataTypes.JSON,
});
