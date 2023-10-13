/*
  Warnings:

  - You are about to alter the column `status` on the `pond` table. The data in that column could be lost. The data in that column will be cast from `Int` to `TinyInt`.
  - You are about to alter the column `isFilled` on the `pond` table. The data in that column could be lost. The data in that column will be cast from `Int` to `TinyInt`.

*/
-- AlterTable
ALTER TABLE `pond` MODIFY `status` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `isFilled` BOOLEAN NOT NULL DEFAULT false;
