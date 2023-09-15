-- CreateTable
CREATE TABLE `device` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL DEFAULT '',
    `notificationEnabled` INTEGER NOT NULL DEFAULT 1,
    `tempLow` DECIMAL(10, 1) NOT NULL DEFAULT 26,
    `tempHigh` DECIMAL(10, 1) NOT NULL DEFAULT 30,
    `phLow` DECIMAL(10, 1) NOT NULL DEFAULT 6.5,
    `phHigh` DECIMAL(10, 1) NOT NULL DEFAULT 8,
    `tdoLow` DECIMAL(10, 1) NOT NULL DEFAULT 4,
    `tdoHigh` DECIMAL(10, 1) NOT NULL DEFAULT 6,
    `tdsLow` DECIMAL(10, 1) NOT NULL DEFAULT 300,
    `tdsHigh` DECIMAL(10, 1) NOT NULL DEFAULT 600,
    `turbiditiesLow` DECIMAL(10, 1) NOT NULL DEFAULT 8.6,
    `turbiditiesHigh` DECIMAL(10, 1) NOT NULL DEFAULT 17.3,
    `userId` VARCHAR(191) NULL,
    `masterId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `device` ADD CONSTRAINT `device_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `device` ADD CONSTRAINT `device_masterId_fkey` FOREIGN KEY (`masterId`) REFERENCES `master`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
