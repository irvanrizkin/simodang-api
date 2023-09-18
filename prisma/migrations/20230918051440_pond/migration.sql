-- CreateTable
CREATE TABLE `pond` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL DEFAULT '',
    `address` VARCHAR(191) NOT NULL DEFAULT '',
    `city` VARCHAR(191) NOT NULL DEFAULT '',
    `seedDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `imageUrl` VARCHAR(191) NOT NULL DEFAULT 'https://placehold.co/1280x720.png',
    `status` INTEGER NOT NULL DEFAULT 0,
    `isFilled` INTEGER NOT NULL DEFAULT 0,
    `userId` VARCHAR(191) NULL,
    `deviceId` VARCHAR(191) NULL,

    UNIQUE INDEX `pond_deviceId_key`(`deviceId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `pond` ADD CONSTRAINT `pond_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pond` ADD CONSTRAINT `pond_deviceId_fkey` FOREIGN KEY (`deviceId`) REFERENCES `device`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
