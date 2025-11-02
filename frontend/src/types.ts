export type Student = {
  id?: number;
  name: string;
  class: string;
  academic_year: string;
  student_id: string;
  school_code: string;
  createdAt?: string;
  updatedAt?: string;
};

export type Teacher = {
  id?: number;
  name: string;
  teacher_id: string;
  academic_year: string;
  school_code: string;
  designation?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

export type ApprovalRequest = {
  id: number;
  payload: any;
  record_type: "student" | "teacher" | string;
  status: "Pending" | "Approved" | "Rejected" | string;
  remarks?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

export type AuditLog = {
  id?: number;
  action: string;
  entity?: string;
  entityId?: string;
  performedBy?: string;
  details?: any;
  createdAt?: string;
};
