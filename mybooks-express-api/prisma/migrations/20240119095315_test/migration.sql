/*
  Warnings:

  - You are about to alter the column `date_added` on the `library_books` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `date_modified` on the `library_books` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `library_books` MODIFY `date_added` DATETIME NOT NULL,
    MODIFY `date_modified` DATETIME NOT NULL;
