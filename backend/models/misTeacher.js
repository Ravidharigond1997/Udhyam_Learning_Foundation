import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const MisTeacher = sequelize.define("mis_teacher", {
  name: DataTypes.STRING,
  teacher_id: DataTypes.STRING,
  academic_year: DataTypes.STRING,
  school_code: DataTypes.STRING,
  designation: DataTypes.STRING,
});
