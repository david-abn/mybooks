/*
  Warnings:

  - You are about to alter the column `date_added` on the `user_bookshelf` table. The data in that column could be lost. The data in that column will be cast from `VarChar(100)` to `DateTime(3)`.
  - You are about to alter the column `date_modified` on the `user_bookshelf` table. The data in that column could be lost. The data in that column will be cast from `VarChar(100)` to `DateTime(3)`.

*/
-- AlterTable
ALTER TABLE `user_bookshelf` MODIFY `date_added` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `date_modified` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `date_added` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
