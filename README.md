# UTPE CEISA Clone

A web application for preparing import and export customs-document drafts and exporting them to an Excel workbook based on a CEISA-style template.

The repository contains two independent Node.js projects:

- [`frontend/`](./frontend/) — Next.js UI and NextAuth session management.
- [`backend/`](./backend/) — Express API, authentication verification, PostgreSQL access, Prisma schema/migrations, and Excel export.

The frontend keeps its same-origin `/api/documents/*` requests. Next.js proxies those requests to the backend, so the backend can be deployed separately by setting the frontend's backend URL configuration.

> **Scope:** This application supports draft preparation and Excel export. It does not submit documents to CEISA or provide an approval workflow.

## Requirements

- Node.js 22.23.4 or later and npm
- A PostgreSQL database
- A shared `AUTH_SECRET` (or `NEXTAUTH_SECRET`) for NextAuth and the Express session verifier

## Local development

Create `backend/.env` with:

```dotenv
DATABASE_URL="<your PostgreSQL connection string>"
AUTH_SECRET="<a long random secret>"
NEXTAUTH_URL="http://localhost:3000"
```

Create `frontend/.env.local` with:

```dotenv
AUTH_SECRET="<the same secret as the backend>"
NEXTAUTH_URL="http://localhost:3000"
BACKEND_URL="http://localhost:4000"
API_BACKEND_URL="http://localhost:4000"
```

Keep environment files out of source control. The frontend calls `BACKEND_URL` for credential verification and uses `API_BACKEND_URL` for its document API rewrite. In production, point both values at the deployed Express service and configure `NEXTAUTH_URL` for the public frontend URL.

Install and start each project in its own terminal:

```bash
cd backend
npm install
npm run migrate:dev
npm run dev
```

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Express listens on port `4000`.

To create the development seed account, run `npm run seed` from `backend/`. The seed file contains a fixed example account and password; replace or remove it before using a shared or production environment.

## Docker Compose

For Compose, place `DATABASE_URL` and `AUTH_SECRET` (or `NEXTAUTH_SECRET`) in a root `.env` file, then run:

```bash
docker compose up --build
```

Compose builds each folder as its own image. The frontend is exposed on port `3000`; Express is internal to the Compose network and reached through the frontend proxy.

To work in VS Code, open the repository folder and run **Dev Containers: Reopen in Container**. The container uses the Compose services above and opens the repository root; the root `.env` must contain the same required values.

## Project commands

| Project | Command | Description |
| --- | --- | --- |
| Frontend | `npm run dev` | Start Next.js development server |
| Frontend | `npm run build` | Build frontend for deployment |
| Frontend | `npm run start` | Start the production frontend |
| Frontend | `npm run lint` | Run ESLint |
| Backend | `npm run dev` | Start Express development server |
| Backend | `npm run build` | Generate Prisma client and build Express |
| Backend | `npm run start` | Start the production API |
| Backend | `npm run migrate:dev` | Apply development migrations |
| Backend | `npm run migrate:deploy` | Apply committed migrations |
| Backend | `npm run seed` | Run the configured database seed |

## API

- `POST /api/auth/credentials` — verify email/password credentials for NextAuth.
- `GET /api/documents/drafts` — list the signed-in user's active drafts.
- `POST /api/documents/drafts` — create or update a draft.
- `GET /api/documents/drafts/:nomorAju` — load a draft.
- `DELETE /api/documents/drafts/:nomorAju` — soft-delete a draft.
- `POST /api/documents/generateNomorAju` — generate an AJU number.
- `POST /api/documents/export` — generate and return an Excel workbook.
- `GET /health` — backend health check.

Express validates the NextAuth JWT cookie using the shared secret and checks that the account is active. The database and Excel template are backend-only concerns.

## Deployment

Build and deploy `frontend/` and `backend/` independently using their own Dockerfiles and package manifests. Configure the frontend's `BACKEND_URL` and `API_BACKEND_URL` to reach the deployed Express service, and provide `AUTH_SECRET`/`NEXTAUTH_SECRET` to both projects. Only the backend needs `DATABASE_URL`.

The database must have the migrations in `backend/prisma/migrations/` applied before application use. The Excel template is located at `backend/templates/excel-ceisa.xlsx`.

## Limitations

- There is no direct CEISA submission or external customs-system integration.
- There is no autosave, draft audit history, or approval/status workflow.
- Some HS-code and duty-rate reference data is maintained in application constants rather than retrieved from a live customs service.
- The draft list currently filters, sorts, and paginates data in the browser.
- Add automated tests for AJU numbering, calculations, access boundaries, validation, and Excel export/template mapping before production use.
