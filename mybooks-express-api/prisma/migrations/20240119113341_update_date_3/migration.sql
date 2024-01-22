-- AlterTable
ALTER TABLE `library_books` MODIFY `date_added` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `date_modified` DATETIME(3) NOT NULL;
