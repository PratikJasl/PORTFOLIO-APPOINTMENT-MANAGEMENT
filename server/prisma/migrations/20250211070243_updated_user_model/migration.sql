/*
  Warnings:

  - The `verifyOtpExpiredAt` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `resetOtpExpiredAt` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "verifyOtpExpiredAt",
ADD COLUMN     "verifyOtpExpiredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "resetOtpExpiredAt",
ADD COLUMN     "resetOtpExpiredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
