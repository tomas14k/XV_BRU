/*
  Warnings:

  - You are about to drop the column `id_gallery` on the `Photo` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Photo" DROP CONSTRAINT "Photo_id_gallery_fkey";

-- AlterTable
ALTER TABLE "Photo" DROP COLUMN "id_gallery";
