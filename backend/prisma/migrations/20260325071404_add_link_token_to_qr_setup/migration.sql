/*
  Warnings:

  - A unique constraint covering the columns `[link_token]` on the table `QrSetup` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `link_token` to the `QrSetup` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "QrSetup" ADD COLUMN     "link_token" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "QrSetup_link_token_key" ON "QrSetup"("link_token");
