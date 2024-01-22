/*
  Warnings:

  - Added the required column `book_status` to the `library_books` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `library_books` ADD COLUMN `book_status` VARCHAR(100) NOT NULL;
