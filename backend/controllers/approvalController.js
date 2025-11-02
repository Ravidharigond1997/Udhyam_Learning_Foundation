import { ApprovalRequest, MisStudent, MisTeacher, AuditLog } from "../models/index.js";

export const getPendingApprovals = async (req, res) => {
  const approvals = await ApprovalRequest.findAll({
    where: { status: "Pending" },
    order: [["createdAt", "DESC"]],
  });
  res.json(approvals);
};

export const approveRequest = async (req, res) => {
  const id = req.params.id;
  const ar = await ApprovalRequest.findByPk(id);
  if (!ar) return res.status(404).json({ error: "Not found" });

  const recordType = ar.record_type;
  const payload = ar.payload;

  if (recordType === "student") await MisStudent.create(payload);
  else await MisTeacher.create(payload);

  await ar.update({ status: "Approved" });
  await AuditLog.create({
    action: "Approve",
    entity: recordType,
    entityId: String(id),
    performedBy: "admin",
    details: { approvalId: id, payload },
  });

  res.json({ ok: true });
};

export const rejectRequest = async (req, res) => {
  const id = req.params.id;
  const { remarks } = req.body;

  const ar = await ApprovalRequest.findByPk(id);
  if (!ar) return res.status(404).json({ error: "Not found" });

  await ar.update({ status: "Rejected", remarks });
  await AuditLog.create({
    action: "Reject",
    entity: "approval_request",
    entityId: String(id),
    performedBy: "admin",
    details: { remarks },
  });

  res.json({ ok: true });
};
