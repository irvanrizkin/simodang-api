-- CreateTable
CREATE TABLE `metric` (
    `id` VARCHAR(191) NOT NULL,
    `temperature` DECIMAL(10, 1) NOT NULL DEFAULT 0,
    `ph` DECIMAL(10, 1) NOT NULL DEFAULT 0,
    `tdo` DECIMAL(10, 1) NOT NULL DEFAULT 0,
    `tds` DECIMAL(10, 1) NOT NULL DEFAULT 0,
    `turbidity` DECIMAL(10, 1) NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deviceId` VARCHAR(191) NULL,
    `pondId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `metric` ADD CONSTRAINT `metric_deviceId_fkey` FOREIGN KEY (`deviceId`) REFERENCES `device`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `metric` ADD CONSTRAINT `metric_pondId_fkey` FOREIGN KEY (`pondId`) REFERENCES `pond`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
