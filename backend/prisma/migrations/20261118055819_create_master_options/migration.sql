/*
  Warnings:

  - You are about to drop the `DocumentDraft` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "DocumentDraft" DROP CONSTRAINT "DocumentDraft_createdById_fkey";

-- DropTable
DROP TABLE "DocumentDraft";

-- CreateTable
CREATE TABLE "Draft" (
    "id" TEXT NOT NULL,
    "ajuNumber" TEXT NOT NULL,
    "documentType" TEXT NOT NULL,
    "entityType" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'DRAFT',
    "header" JSONB,
    "entities" JSONB,
    "documents" JSONB,
    "packages" JSONB,
    "containers" JSONB,
    "transport" JSONB,
    "transactions" JSONB,
    "goods" JSONB,
    "declarations" JSONB,
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Draft_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OptionCategory" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OptionCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MasterOption" (
    "id" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MasterOption_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Draft_documentType_idx" ON "Draft"("documentType");

-- CreateIndex
CREATE INDEX "Draft_status_idx" ON "Draft"("status");

-- CreateIndex
CREATE INDEX "Draft_createdById_idx" ON "Draft"("createdById");

-- CreateIndex
CREATE UNIQUE INDEX "Draft_ajuNumber_createdById_key" ON "Draft"("ajuNumber", "createdById");

-- CreateIndex
CREATE UNIQUE INDEX "OptionCategory_code_key" ON "OptionCategory"("code");

-- CreateIndex
CREATE INDEX "OptionCategory_name_idx" ON "OptionCategory"("name");

-- CreateIndex
CREATE INDEX "MasterOption_categoryId_sortOrder_idx" ON "MasterOption"("categoryId", "sortOrder");

-- CreateIndex
CREATE INDEX "MasterOption_isActive_idx" ON "MasterOption"("isActive");

-- CreateIndex
CREATE UNIQUE INDEX "MasterOption_categoryId_value_key" ON "MasterOption"("categoryId", "value");

-- AddForeignKey
ALTER TABLE "Draft" ADD CONSTRAINT "Draft_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MasterOption" ADD CONSTRAINT "MasterOption_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "OptionCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
