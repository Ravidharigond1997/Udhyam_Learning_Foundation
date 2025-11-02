export function validateStudentRow(row) {
  const errors = [];
  if (!row.name) errors.push("name is required");
  if (!row.class) errors.push("class is required");
  if (!row.academic_year) errors.push("academic_year is required");
  if (!row.student_id) errors.push("student_id is required");
  if (!row.school_code) errors.push("school_code is required");
  return errors;
}

export function validateTeacherRow(row) {
  const errors = [];
  if (!row.name) errors.push("name is required");
  if (!row.teacher_id) errors.push("teacher_id is required");
  if (!row.academic_year) errors.push("academic_year is required");
  if (!row.school_code) errors.push("school_code is required");
  return errors;
}
