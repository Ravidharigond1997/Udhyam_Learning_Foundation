# Admin MIS - Fullstack (Fastify + Sequelize + React TS)

This archive contains a fullstack sample project implementing the requirements you asked for: direct CSV/XLS uploads that seed MIS tables, an approval workflow (dummy data), and audit logs.

## What is included

- backend/: Fastify (TypeScript) + Sequelize models (MySQL)
- frontend/: React + TypeScript (Vite) admin UI (Upload, Pending Approvals, MIS view, Audit logs)

## How to run (no Docker)

### Backend

1. Install MySQL and create a database (e.g., admin_mis).
2. Copy `backend/.env.example` to `backend/.env` and fill in DB credentials.
3. Install dependencies and run backend:

```bash
cd backend
npm ci
npx tsc --noEmit # optional typecheck
npm run dev
```

The server listens on port from `.env` (default 4000).

### Frontend

```bash
cd frontend
npm ci
npm run dev
```

Open the Vite dev URL (usually http://localhost:5173). The frontend expects the backend at `http://localhost:4000` by default; change `REACT_APP_API_URL` if needed.

## Notes

- This project uses `sequelize.sync()` for simplicity. For production, use migrations and proper secrets management.
- Authentication is stubbed; the backend uses `performedBy: 'admin'` for audit logs. Integrate proper auth for real systems.
- Validation is minimal; feel free to extend with Joi/Zod.

