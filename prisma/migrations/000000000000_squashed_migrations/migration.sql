-- CreateTable
CREATE TABLE `user` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `uid` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL DEFAULT '',
    `phoneNum` VARCHAR(191) NOT NULL DEFAULT '',
    `address` VARCHAR(191) NOT NULL DEFAULT '',
    `photo` VARCHAR(191) NOT NULL DEFAULT 'https://placehold.co/500x500.png',
    `role` VARCHAR(191) NOT NULL DEFAULT 'user',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `user_email_key`(`email`),
    UNIQUE INDEX `user_uid_key`(`uid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `article` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL DEFAULT '',
    `url` TEXT NOT NULL,
    `image` TEXT NOT NULL,
    `published` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `notification` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL DEFAULT '',
    `message` VARCHAR(191) NOT NULL DEFAULT '',
    `deleted` BOOLEAN NOT NULL DEFAULT false,
    `isRead` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `userId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `master` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL DEFAULT '',
    `simNumber` VARCHAR(191) NOT NULL DEFAULT '',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `userId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `device` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL DEFAULT '',
    `notificationEnabled` BOOLEAN NOT NULL DEFAULT true,
    `notificationCount` INTEGER NOT NULL DEFAULT 0,
    `isSaved` BOOLEAN NOT NULL DEFAULT false,
    `isChanged` BOOLEAN NOT NULL DEFAULT false,
    `autoWaterEnabled` BOOLEAN NOT NULL DEFAULT false,
    `autoFeedEnabled` BOOLEAN NOT NULL DEFAULT false,
    `tempLow` DECIMAL(10, 1) NOT NULL DEFAULT 0,
    `tempHigh` DECIMAL(10, 1) NOT NULL DEFAULT 0,
    `phLow` DECIMAL(10, 1) NOT NULL DEFAULT 0,
    `phHigh` DECIMAL(10, 1) NOT NULL DEFAULT 0,
    `tdoLow` DECIMAL(10, 1) NOT NULL DEFAULT 0,
    `tdoHigh` DECIMAL(10, 1) NOT NULL DEFAULT 0,
    `tdsLow` DECIMAL(10, 1) NOT NULL DEFAULT 0,
    `tdsHigh` DECIMAL(10, 1) NOT NULL DEFAULT 0,
    `turbiditiesLow` DECIMAL(10, 1) NOT NULL DEFAULT 0,
    `turbiditiesHigh` DECIMAL(10, 1) NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `userId` VARCHAR(191) NULL,
    `masterId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pond` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL DEFAULT '',
    `address` VARCHAR(191) NOT NULL DEFAULT '',
    `city` VARCHAR(191) NOT NULL DEFAULT '',
    `seedDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `seedCount` INTEGER NOT NULL DEFAULT 0,
    `imageUrl` TEXT NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT false,
    `isFilled` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `userId` VARCHAR(191) NULL,
    `deviceId` VARCHAR(191) NULL,

    UNIQUE INDEX `pond_deviceId_key`(`deviceId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `metric` (
    `id` VARCHAR(191) NOT NULL,
    `temperature` DECIMAL(10, 1) NOT NULL DEFAULT 0,
    `ph` DECIMAL(10, 1) NOT NULL DEFAULT 0,
    `tdo` DECIMAL(10, 1) NOT NULL DEFAULT 0,
    `tds` DECIMAL(10, 1) NOT NULL DEFAULT 0,
    `turbidity` DECIMAL(10, 1) NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdAtWib` VARCHAR(191) NOT NULL DEFAULT '',
    `deviceId` VARCHAR(191) NULL,
    `pondId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `metrictemp` (
    `id` VARCHAR(191) NOT NULL,
    `temperature` DECIMAL(10, 1) NOT NULL DEFAULT 0,
    `ph` DECIMAL(10, 1) NOT NULL DEFAULT 0,
    `tdo` DECIMAL(10, 1) NOT NULL DEFAULT 0,
    `tds` DECIMAL(10, 1) NOT NULL DEFAULT 0,
    `turbidity` DECIMAL(10, 1) NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdAtWib` VARCHAR(191) NOT NULL DEFAULT '',
    `deviceId` VARCHAR(191) NULL,
    `pondId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `log` (
    `id` VARCHAR(191) NOT NULL,
    `scope` VARCHAR(191) NOT NULL DEFAULT '',
    `summary` VARCHAR(191) NOT NULL DEFAULT '',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pricingplan` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL DEFAULT '',
    `description` VARCHAR(191) NOT NULL DEFAULT '',
    `pondLimit` INTEGER NOT NULL DEFAULT 0,
    `duration` INTEGER NOT NULL DEFAULT 0,
    `price` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `subscription` (
    `id` VARCHAR(191) NOT NULL,
    `status` TINYINT NOT NULL DEFAULT 0,
    `expiredAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `isPaid` BOOLEAN NOT NULL DEFAULT false,
    `userId` VARCHAR(191) NULL,
    `pricingPlanId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `transaction` (
    `id` VARCHAR(191) NOT NULL,
    `status` TINYINT NOT NULL DEFAULT 0,
    `amount` INTEGER NOT NULL DEFAULT 0,
    `expiredAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `userId` VARCHAR(191) NULL,
    `subscriptionId` VARCHAR(191) NULL,
    `paymentLink` VARCHAR(191) NOT NULL DEFAULT '',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sidebar` (
    `id` VARCHAR(191) NOT NULL,
    `label` VARCHAR(191) NOT NULL DEFAULT '',
    `parentId` VARCHAR(191) NOT NULL DEFAULT '',
    `icon` VARCHAR(191) NOT NULL DEFAULT '',
    `order` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `notification` ADD CONSTRAINT `notification_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `master` ADD CONSTRAINT `master_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `device` ADD CONSTRAINT `device_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `device` ADD CONSTRAINT `device_masterId_fkey` FOREIGN KEY (`masterId`) REFERENCES `master`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pond` ADD CONSTRAINT `pond_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pond` ADD CONSTRAINT `pond_deviceId_fkey` FOREIGN KEY (`deviceId`) REFERENCES `device`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `metric` ADD CONSTRAINT `metric_deviceId_fkey` FOREIGN KEY (`deviceId`) REFERENCES `device`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `metric` ADD CONSTRAINT `metric_pondId_fkey` FOREIGN KEY (`pondId`) REFERENCES `pond`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `metrictemp` ADD CONSTRAINT `metrictemp_deviceId_fkey` FOREIGN KEY (`deviceId`) REFERENCES `device`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `metrictemp` ADD CONSTRAINT `metrictemp_pondId_fkey` FOREIGN KEY (`pondId`) REFERENCES `pond`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `subscription` ADD CONSTRAINT `subscription_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `subscription` ADD CONSTRAINT `subscription_pricingPlanId_fkey` FOREIGN KEY (`pricingPlanId`) REFERENCES `pricingplan`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transaction` ADD CONSTRAINT `transaction_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transaction` ADD CONSTRAINT `transaction_subscriptionId_fkey` FOREIGN KEY (`subscriptionId`) REFERENCES `subscription`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

