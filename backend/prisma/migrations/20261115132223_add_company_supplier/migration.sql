/*
  Warnings:

  - You are about to drop the column `data` on the `DocumentDraft` table. All the data in the column will be lost.
  - You are about to drop the column `jenisEntitas` on the `DocumentDraft` table. All the data in the column will be lost.
  - You are about to drop the column `kodeDokumen` on the `DocumentDraft` table. All the data in the column will be lost.
  - You are about to drop the column `nomorAju` on the `DocumentDraft` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[ajuNumber,createdById]` on the table `DocumentDraft` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ajuNumber` to the `DocumentDraft` table without a default value. This is not possible if the table is not empty.
  - Added the required column `documentType` to the `DocumentDraft` table without a default value. This is not possible if the table is not empty.
  - Added the required column `entityType` to the `DocumentDraft` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "DocumentDraft_kodeDokumen_idx";

-- DropIndex
DROP INDEX "DocumentDraft_nomorAju_createdById_key";

-- AlterTable
ALTER TABLE "DocumentDraft" DROP COLUMN "data",
DROP COLUMN "jenisEntitas",
DROP COLUMN "kodeDokumen",
DROP COLUMN "nomorAju",
ADD COLUMN     "ajuNumber" TEXT NOT NULL,
ADD COLUMN     "declarations" JSONB,
ADD COLUMN     "documentType" TEXT NOT NULL,
ADD COLUMN     "documents" JSONB,
ADD COLUMN     "entities" JSONB,
ADD COLUMN     "entityType" TEXT NOT NULL,
ADD COLUMN     "goods" JSONB,
ADD COLUMN     "header" JSONB,
ADD COLUMN     "packages" JSONB,
ADD COLUMN     "transactions" JSONB,
ADD COLUMN     "transport" JSONB;

-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL,
    "identityTypeCode" TEXT NOT NULL,
    "identityNumber" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "apiTypeCode" TEXT NOT NULL,
    "apiNumber" TEXT NOT NULL,
    "statusCode" TEXT NOT NULL,
    "countryCode" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Supplier" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "countryCode" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Supplier_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Company_name_idx" ON "Company"("name");

-- CreateIndex
CREATE INDEX "Company_identityNumber_idx" ON "Company"("identityNumber");

-- CreateIndex
CREATE INDEX "Supplier_name_idx" ON "Supplier"("name");

-- CreateIndex
CREATE INDEX "DocumentDraft_documentType_idx" ON "DocumentDraft"("documentType");

-- CreateIndex
CREATE INDEX "DocumentDraft_createdById_idx" ON "DocumentDraft"("createdById");

-- CreateIndex
CREATE UNIQUE INDEX "DocumentDraft_ajuNumber_createdById_key" ON "DocumentDraft"("ajuNumber", "createdById");
