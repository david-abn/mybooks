/*
  Warnings:

  - The primary key for the `bookshelf_books` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `bookshelf_books_id` on the `bookshelf_books` table. All the data in the column will be lost.
  - You are about to drop the `books` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_bookshelf` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `user_id` to the `bookshelf_books` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `bookshelf_books` DROP FOREIGN KEY `bookshelf_books_books_FK`;

-- DropForeignKey
ALTER TABLE `bookshelf_books` DROP FOREIGN KEY `bookshelf_books_user_bookshelf_FK`;

-- DropForeignKey
ALTER TABLE `user_bookshelf` DROP FOREIGN KEY `user_bookshelf_users_FK`;

-- AlterTable
ALTER TABLE `bookshelf_books` DROP PRIMARY KEY,
    DROP COLUMN `bookshelf_books_id`,
    ADD COLUMN `user_id` INTEGER NOT NULL,
    ADD PRIMARY KEY (`book_id`, `bookshelf_id`);

-- DropTable
DROP TABLE `books`;

-- DropTable
DROP TABLE `user_bookshelf`;

-- DropTable
DROP TABLE `users`;

-- CreateTable
CREATE TABLE `Book` (
    `book_id` VARCHAR(100) NOT NULL,
    `author` VARCHAR(100) NULL,
    `title` VARCHAR(100) NULL,
    `subtitle` VARCHAR(100) NULL,
    `description` VARCHAR(1000) NULL,
    `release_year` INTEGER NULL,

    INDEX `Book_book_id_idx`(`book_id`),
    PRIMARY KEY (`book_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserBookshelf` (
    `bookshelf_id` INTEGER NOT NULL AUTO_INCREMENT,
    `bookshelf_name` VARCHAR(100) NOT NULL,
    `user_id` INTEGER NOT NULL,
    `date_added` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `date_modified` DATETIME(3) NOT NULL,

    INDEX `user_bookshelf_users_FK`(`user_id`),
    UNIQUE INDEX `UserBookshelf_user_id_bookshelf_name_key`(`user_id`, `bookshelf_name`),
    UNIQUE INDEX `UserBookshelf_bookshelf_id_user_id_key`(`bookshelf_id`, `user_id`),
    PRIMARY KEY (`bookshelf_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Users` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_first_name` VARCHAR(100) NULL,
    `user_family_name` VARCHAR(100) NULL,
    `user_full_name` VARCHAR(100) NULL,
    `user_picture` VARCHAR(500) NULL,
    `user_email` VARCHAR(100) NOT NULL,
    `date_added` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `oauth_provider` VARCHAR(20) NULL,

    UNIQUE INDEX `Users_user_email_key`(`user_email`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Session` (
    `id` VARCHAR(191) NOT NULL,
    `sid` VARCHAR(191) NOT NULL,
    `data` VARCHAR(300) NOT NULL,
    `expiresAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Session_sid_key`(`sid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `bookshelf_books_users_FK` ON `bookshelf_books`(`user_id`);

-- AddForeignKey
ALTER TABLE `bookshelf_books` ADD CONSTRAINT `bookshelf_books_book_id_fkey` FOREIGN KEY (`book_id`) REFERENCES `Book`(`book_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bookshelf_books` ADD CONSTRAINT `bookshelf_books_bookshelf_id_user_id_fkey` FOREIGN KEY (`bookshelf_id`, `user_id`) REFERENCES `UserBookshelf`(`bookshelf_id`, `user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserBookshelf` ADD CONSTRAINT `UserBookshelf_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `Users`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
