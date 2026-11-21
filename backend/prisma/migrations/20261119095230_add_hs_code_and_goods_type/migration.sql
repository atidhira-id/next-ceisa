-- CreateTable
CREATE TABLE "HsCode" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "importDutyPercentage" DECIMAL(5,2) NOT NULL,
    "vatPercentage" DECIMAL(5,2) NOT NULL,
    "incomeTaxPercentage" DECIMAL(5,2) NOT NULL,
    "borderRestriction" TEXT,
    "postBorderRestriction" TEXT,
    "label" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HsCode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GoodsType" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "hsCodeId" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GoodsType_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "HsCode_code_key" ON "HsCode"("code");

-- CreateIndex
CREATE INDEX "HsCode_code_idx" ON "HsCode"("code");

-- CreateIndex
CREATE UNIQUE INDEX "GoodsType_code_key" ON "GoodsType"("code");

-- CreateIndex
CREATE INDEX "GoodsType_hsCodeId_idx" ON "GoodsType"("hsCodeId");

-- AddForeignKey
ALTER TABLE "GoodsType" ADD CONSTRAINT "GoodsType_hsCodeId_fkey" FOREIGN KEY ("hsCodeId") REFERENCES "HsCode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
