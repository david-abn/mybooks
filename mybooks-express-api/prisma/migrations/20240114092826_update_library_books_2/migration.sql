/*
  Warnings:

  - You are about to alter the column `date_added` on the `library_books` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `date_modified` on the `library_books` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - A unique constraint covering the columns `[book_id]` on the table `library_books` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `library_books` MODIFY `date_added` DATETIME NOT NULL,
    MODIFY `date_modified` DATETIME NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `library_books_book_id_key` ON `library_books`(`book_id`);
