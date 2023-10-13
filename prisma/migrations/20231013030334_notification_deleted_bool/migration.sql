/*
  Warnings:

  - You are about to alter the column `deleted` on the `notification` table. The data in that column could be lost. The data in that column will be cast from `Int` to `TinyInt`.

*/
-- AlterTable
ALTER TABLE `notification` MODIFY `deleted` BOOLEAN NOT NULL DEFAULT false;
