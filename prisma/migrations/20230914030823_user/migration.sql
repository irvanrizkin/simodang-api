-- CreateTable
CREATE TABLE `user` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `uid` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL DEFAULT '',
    `phoneNum` VARCHAR(191) NOT NULL DEFAULT '',
    `address` VARCHAR(191) NOT NULL DEFAULT '',
    `photo` VARCHAR(191) NOT NULL DEFAULT 'https://placehold.co/500x500.png',
    `token` VARCHAR(191) NOT NULL DEFAULT '',
    `role` VARCHAR(191) NOT NULL DEFAULT 'user',

    UNIQUE INDEX `user_email_key`(`email`),
    UNIQUE INDEX `user_uid_key`(`uid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
