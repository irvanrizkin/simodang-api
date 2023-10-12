/*
  Warnings:

  - You are about to alter the column `published` on the `article` table. The data in that column could be lost. The data in that column will be cast from `Int` to `TinyInt`.

*/
-- AlterTable
ALTER TABLE `article` MODIFY `published` BOOLEAN NOT NULL DEFAULT false;
