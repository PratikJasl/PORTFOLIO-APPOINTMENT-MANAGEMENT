/*
  Warnings:

  - You are about to drop the column `appointementTime` on the `Appointment` table. All the data in the column will be lost.
  - Added the required column `appointmentTime` to the `Appointment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Appointment" DROP COLUMN "appointementTime",
ADD COLUMN     "appointmentTime" TIMESTAMP(3) NOT NULL;
