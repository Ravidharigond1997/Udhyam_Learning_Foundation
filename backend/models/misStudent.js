import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const MisStudent = sequelize.define("mis_student", {
  name: DataTypes.STRING,
  class: DataTypes.STRING,
  academic_year: DataTypes.STRING,
  student_id: DataTypes.STRING,
  school_code: DataTypes.STRING,
});
