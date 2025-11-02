import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const ApprovalRequest = sequelize.define("approval_request", {
  record_type: DataTypes.STRING,
  payload: DataTypes.JSON,
  status: { type: DataTypes.STRING, defaultValue: "Pending" },
  remarks: DataTypes.STRING,
});
