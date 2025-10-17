-- CreateTable
CREATE TABLE "MedicalRecord" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "patientName" TEXT NOT NULL,
    "patientAge" INTEGER,
    "patientGender" TEXT,
    "medicalContent" TEXT NOT NULL,
    "hasHeartFailure" BOOLEAN,
    "hasKidneyProblems" BOOLEAN,
    "takesAntidepressants" BOOLEAN,
    "hasCancer" BOOLEAN,
    "heartFailureScore" REAL,
    "kidneyProblemsScore" REAL,
    "antidepressantScore" REAL,
    "cancerScore" REAL,
    "fullAnalysis" TEXT,
    "model" TEXT NOT NULL DEFAULT 'claude-3-5-sonnet-20241022'
);

-- CreateIndex
CREATE INDEX "MedicalRecord_createdAt_idx" ON "MedicalRecord"("createdAt");
