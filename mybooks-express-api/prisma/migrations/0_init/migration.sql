-- CreateTable
CREATE TABLE `books` (
    `book_id` VARCHAR(100) NOT NULL,
    `author` VARCHAR(100) NULL,
    `title` VARCHAR(100) NULL,
    `subtitle` VARCHAR(100) NULL,
    `description` VARCHAR(1000) NULL,
    `release_year` INTEGER NULL,

    PRIMARY KEY (`book_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `library_books` (
    `library_books_id` INTEGER NOT NULL AUTO_INCREMENT,
    `library_id` INTEGER NOT NULL,
    `book_id` VARCHAR(100) NOT NULL,
    `book_thoughts` VARCHAR(1000) NULL,
    `book_private` BOOLEAN NULL,
    `thoughts_private` BOOLEAN NULL,
    `date_added` DATE NOT NULL,
    `date_modified` DATE NOT NULL,

    INDEX `library_books_books_FK`(`book_id`),
    INDEX `library_books_user_library_FK`(`library_id`),
    PRIMARY KEY (`library_books_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_library` (
    `library_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `book_id` VARCHAR(100) NOT NULL,
    `date_added` VARCHAR(100) NOT NULL,
    `date_modified` VARCHAR(100) NOT NULL,

    INDEX `user_library_books_FK`(`book_id`),
    INDEX `user_library_users_FK`(`user_id`),
    PRIMARY KEY (`library_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_full_name` VARCHAR(100) NULL,
    `user_email` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `library_books` ADD CONSTRAINT `library_books_books_FK` FOREIGN KEY (`book_id`) REFERENCES `books`(`book_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `library_books` ADD CONSTRAINT `library_books_user_library_FK` FOREIGN KEY (`library_id`) REFERENCES `user_library`(`library_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `user_library` ADD CONSTRAINT `user_library_books_FK` FOREIGN KEY (`book_id`) REFERENCES `books`(`book_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `user_library` ADD CONSTRAINT `user_library_users_FK` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

