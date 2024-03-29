import { Router, Request, Response } from 'express';
import { Book } from '../models/book';
import { PrismaClient, Prisma, bookshelf_books } from '@prisma/client'
import { body, validationResult } from 'express-validator';

const prisma = new PrismaClient()

const router = Router();

const bookStatusOptions = /\b(reading|finished|not_started)\b/;
const bookValidationRules = [
    body('title').notEmpty().escape().withMessage('Title is required.'),
    body('release_year').escape().isNumeric().withMessage('Release year should be number.'),
    body('author').isString().withMessage("Author should be a string."),
    body('book_thoughts').isString().escape().withMessage('Book Thoughts should be a string'),
    body('book_status').isString().matches(bookStatusOptions).withMessage('Status should be a string and be one of reading|finished|plan to read'),
    body('thoughts_private').isBoolean().withMessage('Privacy should be a boolean.'),
    body('book_private').isBoolean().withMessage('Privacy should be a boolean.'),
    body('bookshelf_id').isNumeric().withMessage('Bookshelf id should be a number.')
];

async function addBook(book: Book) {
    // Create book in books table
    try {
        const bookAdded = await prisma.books.create({
            data: {
                book_id: book.book_id,
                author: book.author,
                title: book.title,
                subtitle: book.subtitle,
                description: book.description,
                release_year: book.release_year,
            },
        })
        console.log('Book created successfully');
        return bookAdded;
    }
    catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            if (err.code === 'P2002') {
                console.log(`Book already exists. Book id: ${book.book_id}`);
                return;
            }
        }
        console.error(`Unable to create book. ${err}`)
    }
}

/**
 * POST request for adding a new book
 * @param {array} bookValidationRules - Rules to sanitize and validate user input
 */
router.post('/new_book', bookValidationRules, async (req: Request, res: Response) => {
    const userId = req.session.user?.userId;
    if (!userId) {
        return res.status(401).send('Unauthorized');
    }
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const book: Book = {
        book_id: req.body.book_id,
        bookshelf_id: parseInt(req.body.bookshelf_id),
        author: req.body.author,
        title: req.body.title,
        subtitle: req.body.subtitle,
        description: req.body.description,
        book_thoughts: req.body.thoughts,
        release_year: parseInt(req.body.release_year),
        book_status: req.body.book_status,
        book_private: req.body.book_private,
        thoughts_private: req.body.thoughts_private,
    };

    console.log(`POST /api/books/new_book \n 
    Book: ${JSON.stringify(book)}`);

    await addBook(book);

    try {
        await prisma.bookshelf_books.create({
            data: {
                book_id: book.book_id,
                bookshelf_id: book.bookshelf_id,
                user_id: userId,
                book_thoughts: book.book_thoughts,
                book_private: book.book_private,
                thoughts_private: book.thoughts_private,
                book_status: book.book_status,
            },
        })
        console.log(`Book added to bookshelf id ${book.bookshelf_id} successfully.`);

    } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            if (err.code === 'P2002') {
                console.log(`Book already exists in bookshelf. Book id: ${book.book_id}`);
                return res.status(400).send('Book already exists in this bookshelf.');
            }
        }
        console.error(`Unable to add book to bookshelf. ${err}`)
        return res.status(500).send('Unable to add book to bookshelf.');
    }
    res.status(201).json(book);
});

/**
 * Retrieves all books by user 
 * @query_param {number} user_id - User ID to retrieve books from
 */
router.get('/user', async (req: Request, res: Response) => {
    const userId = req.query.user_id;
    const result = await prisma.$queryRaw`SELECT * from bookshelf_books where user_id = ${userId}`
        .then(async () => {
            console.log('Returned user books successfully.')
        })
        .catch(async (e) => {
            console.error(e);
            console.log('Error retrieving user books');
        })

    console.log(result);
    res.json(result);
})

/**
 * Returns bookshelf id associated with user and bookshelf name
 * @param {string} bookshelfName - bookshelf name
 * @param {number} userId - user id
 */
async function getBookshelfId(bookshelfName: string, userId: number) {
    try {
        const bookshelfId = await prisma.user_bookshelf.findFirst({
            where: {
                user_id: userId,
                bookshelf_name: bookshelfName,
            },
            select: {
                bookshelf_id: true
            }
        })
        return bookshelfId?.bookshelf_id
    } catch (err) {
        console.error(`Unable to retrieve bookshelf id using ${userId}
        and ${bookshelfName}: ${err}`);
    }
}

/**
 * Retrieve all books inside a bookshelf
 * @query_param {number} bookshelf_name - bookshelf name to retrieve books from
 */
router.get('/', async (req: Request, res: Response) => {
    const userId = req.session.user?.userId;
    if (!userId) {
        return res.status(401).send('Unauthorized');
    }

    const bookshelfName: string = req.query.bookshelf_name as string;

    if (!bookshelfName) {
        res.status(400).send('Provide valid book shelf id.');
    }

    console.log(`GET /api/books - bookshelf name: ${bookshelfName}`)

    const bookshelfId = await getBookshelfId(bookshelfName, userId);

    try {
        const books_results = await prisma.bookshelf_books.findMany({
            where: {
                bookshelf_id: bookshelfId,
            }
        })

        res.status(200).json(books_results);
    }
    catch (err) {
        console.error(`Unable to retrieve books using ${bookshelfId}`)
        res.status(500).send('Error retrieving books');
    }
    await prisma.$disconnect;
});

// router.put('/update_book/:book_id', (req: Request, res: Response) => {
//     const book = books.find((t) => t.book_id === parseInt(req.params.book_id));

//     if (!task) {
//       res.status(404).send('Task not found');
//     } else {
//       task.title = req.body.title || task.title;
//       task.description = req.body.description || task.description;
//       task.completed = req.body.completed || task.completed;

//       res.json(task);
//     }
//   });

export default router;