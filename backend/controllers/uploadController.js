import { MisStudent, MisTeacher, AuditLog } from "../models/index.js";
import { parseFileBuffer } from "../services/parser.js";
import { validateStudentRow, validateTeacherRow } from "../utils/validators.js";

export const uploadData = async (req, res) => {
  try {
    if (!req.files?.file) {
      return res.status(400).json({ error: "File required" });
    }

    const { file } = req.files;
    const { type } = req.query;

    const allowedExtensions = [".csv", ".xml"];
    const fileExt = file.name.substring(file.name.lastIndexOf(".")).toLowerCase();

    if (!allowedExtensions.includes(fileExt)) {
      return res
        .status(400)
        .json({ error: "Invalid file type. Only .csv and .xml files are allowed." });
    }
    const rows = await parseFileBuffer(file.name, file.data);

    const results = [];

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const rowIndex = i + 1;

      if (type === "teacher") {
        const errs = validateTeacherRow(row);
        if (errs.length) {
          results.push({ row: rowIndex, ok: false, errors: errs });
          continue;
        }
        await MisTeacher.create(row);
      } else {
        const errs = validateStudentRow(row);
        if (errs.length) {
          results.push({ row: rowIndex, ok: false, errors: errs });
          continue;
        }
        await MisStudent.create(row);
      }

      results.push({ row: rowIndex, ok: true });
    }

    await AuditLog.create({
      action: "Upload",
      entity: type === "teacher" ? "mis_teachers" : "mis_students",
      performedBy: "admin",
      details: { file: file.name, summary: results },
    });

    res.json({
      message: "File uploaded successfully",
      summary: results,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
