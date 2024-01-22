/*
  Warnings:

  - You are about to drop the column `book_id` on the `user_bookshelf` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `user_bookshelf` DROP FOREIGN KEY `user_bookshelf_books_FK`;

-- AlterTable
ALTER TABLE `user_bookshelf` DROP COLUMN `book_id`;
