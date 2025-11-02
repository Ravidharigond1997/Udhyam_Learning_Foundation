import { MisStudent, MisTeacher, AuditLog } from "../models/index.js";

export const getStudents = async (req, res) => {
  res.json(await MisStudent.findAll({ order: [["createdAt", "DESC"]] }));
};

export const getTeachers = async (req, res) => {
  res.json(await MisTeacher.findAll({ order: [["createdAt", "DESC"]] }));
};

export const getAuditLogs = async (req, res) => {
  res.json(await AuditLog.findAll({ order: [["createdAt", "DESC"]], limit: 200 }));
};
