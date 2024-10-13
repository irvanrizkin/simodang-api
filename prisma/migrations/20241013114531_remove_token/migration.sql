/*
  Warnings:

  - You are about to drop the column `token` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `token` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `token` DROP FOREIGN KEY `token_userId_fkey`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `token`;

-- DropTable
DROP TABLE `token`;
