/*
  Warnings:

  - You are about to alter the column `notificationEnabled` on the `device` table. The data in that column could be lost. The data in that column will be cast from `Int` to `TinyInt`.
  - You are about to alter the column `isSaved` on the `device` table. The data in that column could be lost. The data in that column will be cast from `Int` to `TinyInt`.
  - You are about to alter the column `isChanged` on the `device` table. The data in that column could be lost. The data in that column will be cast from `Int` to `TinyInt`.
  - You are about to alter the column `autoWaterEnabled` on the `device` table. The data in that column could be lost. The data in that column will be cast from `Int` to `TinyInt`.
  - You are about to alter the column `autoFeedEnabled` on the `device` table. The data in that column could be lost. The data in that column will be cast from `Int` to `TinyInt`.

*/
-- AlterTable
ALTER TABLE `device` MODIFY `notificationEnabled` BOOLEAN NOT NULL DEFAULT true,
    MODIFY `isSaved` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `isChanged` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `autoWaterEnabled` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `autoFeedEnabled` BOOLEAN NOT NULL DEFAULT false;
