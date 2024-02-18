import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const router = Router();

/**
 * Retrieve metrics for dashboard
 * Number of bookshelves, total number of books,
 * Number of books by book status "reading" | "finished" | "plan to read"
 * @returns {Object} booksCount, booksStatusCount
 */
router.get('/', async (req: Request, res: Response) => {
    const userId = req.session.user?.userId;

    const booksCounts = await prisma.users.findUnique({
        where: { user_id: userId },
        select: {
            _count: {
                select: {
                    bookshelf_books: true,
                    user_bookshelf: true,
                }
            }
        }
    })
    let booksStatusCount = await prisma.bookshelf_books.groupBy({
        by: "book_status",
        _count: {
            book_status: true,
        },
        where: {
            user_id: userId,
        }

    });

    const countByBookStatus: { [key: string]: number } = {};

    if (booksStatusCount) {
        for (let book of booksStatusCount) {
            countByBookStatus[book.book_status] = book._count.book_status;
        }

    }

    res.status(200).json({ "booksCount": booksCounts, "bookStatusCount": countByBookStatus });
});

export default router; 