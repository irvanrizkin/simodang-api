-- AlterTable
ALTER TABLE `metric` ADD COLUMN `createdAtWib` VARCHAR(191) NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE `metrictemp` ADD COLUMN `createdAtWib` VARCHAR(191) NOT NULL DEFAULT '';
