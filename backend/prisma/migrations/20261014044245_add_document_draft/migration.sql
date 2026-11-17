-- CreateTable
CREATE TABLE "DocumentDraft" (
    "id" TEXT NOT NULL,
    "nomorAju" TEXT NOT NULL,
    "kodeDokumen" TEXT NOT NULL,
    "jenisEntitas" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'DRAFT',
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DocumentDraft_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "DocumentDraft_kodeDokumen_idx" ON "DocumentDraft"("kodeDokumen");

-- CreateIndex
CREATE INDEX "DocumentDraft_status_idx" ON "DocumentDraft"("status");

-- CreateIndex
CREATE UNIQUE INDEX "DocumentDraft_nomorAju_createdById_key" ON "DocumentDraft"("nomorAju", "createdById");

-- AddForeignKey
ALTER TABLE "DocumentDraft" ADD CONSTRAINT "DocumentDraft_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
