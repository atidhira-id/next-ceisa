# UTPE CEISA Clone

A web application for preparing import and export customs-document drafts and exporting them to an Excel workbook based on a CEISA-style template.

> **Scope:** This application supports draft preparation and Excel export. The current codebase does not submit documents to CEISA or provide an approval workflow.

## Features

- Sign in with email and password, and create an account from the auth screen.
- Create, edit, list, filter, sort, and soft-delete customs-document drafts.
- Capture data across nine sections: Header, Entitas, Dokumen, Pengangkut, Kemasan & Peti Kemas, Transaksi, Barang, Pungutan, and Pernyataan.
- Generate an AJU number using a PostgreSQL sequence and the Asia/Jakarta date.
- Calculate and display transaction, customs-value, weight, and estimated-duty values from entered data.
- Export a document as an Excel workbook using the template at [`templates/excel-ceisa.xlsx`](./templates/excel-ceisa.xlsx).

## Technology

- Next.js 16 App Router, React 19, and TypeScript 5
- NextAuth.js credentials authentication with `bcryptjs`
- PostgreSQL with Prisma 7 and the Prisma PostgreSQL adapter
- Tailwind CSS 4 and PostCSS
- ExcelJS for workbook generation
- `lucide-react` for icons

The application uses React state and a custom context for document editing; it does not currently use a separate state-management library.

A registration flow is available from the sign-in page for creating new user accounts before accessing protected document workflows.

## Prerequisites

- Node.js 22.23.4 or later (the included Dockerfile uses Node 22.23.4)
- npm
- A PostgreSQL database accessible to the application

## Local setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create `.env.local` in the project root. This file is git-ignored. Set the database connection string:

   ```dotenv
   DATABASE_URL="<your PostgreSQL connection string>"
   ```

   Use your database provider's connection string and keep credentials out of source control. For deployments, also configure `NEXTAUTH_SECRET` with a securely generated secret and `NEXTAUTH_URL` with the application's public base URL.

3. Apply database migrations:

   ```bash
   npx prisma migrate dev
   ```

   The Prisma schema and migration history are in [`prisma/`](./prisma/). The migrations create the user and draft tables and the AJU-number sequence.

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000). Protected pages redirect unauthenticated users to `/login`.

### Creating a development user

The configured Prisma seed command is `tsx prisma/seed.ts`. To create the seed account, run:

```bash
npx prisma db seed
```

The seed file contains a fixed example account and password. It is for local development only; replace or remove it and create a secure account-provisioning process before deploying. Never use the seeded credentials in a shared or production environment.

## Common commands

| Command                     | Description                                          |
| --------------------------- | ---------------------------------------------------- |
| `npm run dev`               | Start the Next.js development server                 |
| `npm run build`             | Generate the Prisma client and build the application |
| `npm run start`             | Start the production Next.js server after building   |
| `npm run lint`              | Run ESLint                                           |
| `npx prisma migrate dev`    | Create/apply development migrations                  |
| `npx prisma migrate deploy` | Apply committed migrations in a deployment           |
| `npx prisma db seed`        | Run the configured database seed                     |

Dependency installation also generates the Prisma client through the package `postinstall` script.

## Application structure

```text
app/
  (auth)/login/                 Login page and form
  (protected)/                  Session-protected dashboard and pages
    dokumen-pabean/              Draft list and document editor
  api/                           Next.js API route handlers
  components/                    Shared UI components
  constants/                     Form options, reference data, and navigation
  providers/document-provider.tsx
  types.ts                       Document and form data types
auth.ts                          NextAuth credentials configuration
lib/
  excel/export-document.ts       Excel template mapping
  prisma.ts                      Prisma client setup
  utils.ts                       Business calculations and formatting
  validation.ts                  Reusable form validation
prisma/
  migrations/                    Database migration history
  schema.prisma                  Database models
  seed.ts                        Development seed
templates/
  excel-ceisa.xlsx               Export workbook template
```

### Main API routes

- `GET /api/documents/drafts` — list the signed-in user's active drafts
- `POST /api/documents/drafts` — create or update a draft
- `GET /api/documents/drafts/[nomorAju]` — load a draft
- `DELETE /api/documents/drafts/[nomorAju]` — soft-delete a draft
- `POST /api/documents/generate-nomor-aju` — generate an AJU number
- `POST /api/documents/export` — generate and return an Excel workbook
- `/api/auth/[...nextauth]` — NextAuth authentication handlers

## Data and workflow

1. A user signs in. Credentials are checked against the stored bcrypt password hash, and the application uses JWT sessions with an eight-hour maximum age.
2. To start a document, the user selects an entity type and document type. The server allocates a sequence number and returns an AJU number.
3. The application initializes a document with default values and saves it as a draft.
4. The editor loads the draft into a React context. Changes are held in client state until the user explicitly saves; autosave is not currently implemented.
5. Draft data is persisted in PostgreSQL. `DocumentDraft` stores searchable fields alongside the full document payload as JSON, and drafts are associated with their creator.
6. Export maps the document into the workbook's sheets and downloads the resulting `.xlsx` file.

Some HS-code and duty-rate reference data is currently maintained in application constants rather than retrieved from a live customs service. Calculated values and exported data should be validated against current business and regulatory requirements before operational use.

## Configuration and deployment notes

- `DATABASE_URL` is required by Prisma and the PostgreSQL adapter.
- Set `NEXTAUTH_SECRET` and `NEXTAUTH_URL` explicitly for deployed environments.
- The database must have the migrations applied before application use.
- Excel export depends on the workbook template being present at `templates/excel-ceisa.xlsx`.
- [`Dockerfile`](./Dockerfile) and [`docker-compose.yml`](./docker-compose.yml) currently describe a development setup; review and harden them before using Docker for production.
- Protect environment files and database backups, which may contain credentials or business-sensitive document data.

## Current limitations and next steps

- There is no direct CEISA submission or external customs-system integration.
- There is no autosave, draft audit history, or approval/status workflow.
- Request validation is limited; add comprehensive server-side validation before relying on the application for production document preparation.
- The draft list currently filters, sorts, and paginates data in the browser. Server-side pagination and query tuning may be appropriate as usage grows.
- Add automated tests for AJU numbering, calculations, access boundaries, validation, and Excel export/template mapping. No test script or test files are currently defined in the repository.
- Document operational procedures for provisioning users, backups/restores, monitoring, and production migrations.
