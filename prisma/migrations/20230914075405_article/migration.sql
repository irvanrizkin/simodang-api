-- CreateTable
CREATE TABLE `article` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL DEFAULT '',
    `url` VARCHAR(191) NOT NULL DEFAULT '',
    `image` VARCHAR(191) NOT NULL DEFAULT '',
    `published` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
