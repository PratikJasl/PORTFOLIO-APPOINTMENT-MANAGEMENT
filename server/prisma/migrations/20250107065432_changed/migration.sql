/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Appointment` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Appointment_email_key" ON "Appointment"("email");
