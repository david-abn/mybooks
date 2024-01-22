/*
  Warnings:

  - You are about to drop the `library_books` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_library` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `library_books` DROP FOREIGN KEY `library_books_books_FK`;

-- DropForeignKey
ALTER TABLE `library_books` DROP FOREIGN KEY `library_books_user_library_FK`;

-- DropForeignKey
ALTER TABLE `user_library` DROP FOREIGN KEY `user_library_books_FK`;

-- DropForeignKey
ALTER TABLE `user_library` DROP FOREIGN KEY `user_library_users_FK`;

-- DropTable
DROP TABLE `library_books`;

-- DropTable
DROP TABLE `user_library`;

-- CreateTable
CREATE TABLE `bookshelf_books` (
    `bookshelf_books_id` INTEGER NOT NULL AUTO_INCREMENT,
    `bookshelf_id` INTEGER NOT NULL,
    `book_id` VARCHAR(100) NOT NULL,
    `book_thoughts` VARCHAR(1000) NULL,
    `book_private` BOOLEAN NULL,
    `thoughts_private` BOOLEAN NULL,
    `book_status` VARCHAR(100) NOT NULL,
    `date_added` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `date_modified` DATETIME(3) NOT NULL,

    UNIQUE INDEX `bookshelf_books_book_id_key`(`book_id`),
    INDEX `bookshelf_books_books_FK`(`book_id`),
    INDEX `bookshelf_books_user_bookshelf_FK`(`bookshelf_id`),
    PRIMARY KEY (`bookshelf_books_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_bookshelf` (
    `bookshelf_id` INTEGER NOT NULL AUTO_INCREMENT,
    `bookshelf_name` VARCHAR(100) NOT NULL,
    `user_id` INTEGER NOT NULL,
    `book_id` VARCHAR(100) NOT NULL,
    `date_added` VARCHAR(100) NOT NULL,
    `date_modified` VARCHAR(100) NOT NULL,

    INDEX `user_bookshelf_books_FK`(`book_id`),
    INDEX `user_bookshelf_users_FK`(`user_id`),
    PRIMARY KEY (`bookshelf_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `bookshelf_books` ADD CONSTRAINT `bookshelf_books_books_FK` FOREIGN KEY (`book_id`) REFERENCES `books`(`book_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `bookshelf_books` ADD CONSTRAINT `bookshelf_books_user_bookshelf_FK` FOREIGN KEY (`bookshelf_id`) REFERENCES `user_bookshelf`(`bookshelf_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `user_bookshelf` ADD CONSTRAINT `user_bookshelf_books_FK` FOREIGN KEY (`book_id`) REFERENCES `books`(`book_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `user_bookshelf` ADD CONSTRAINT `user_bookshelf_users_FK` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
