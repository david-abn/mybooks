
import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client'
import { body, validationResult } from 'express-validator';

const prisma = new PrismaClient()

const router = Router();

const bookshelfValidationRules = [
    body('bookshelfName').isString().notEmpty().escape().withMessage('Please enter valid bookshelf name')
];

/**
 * POST request for adding a new bookshelf.
 * @param {array} bookshelfValidationRules - Rules to sanitize and validate user input
 */
router.post('/new_bookshelf', bookshelfValidationRules, async (req: Request, res: Response) => {
    const userId = req.session.user?.userId;
    if (!userId) {
        return res.status(401).json({ "Error": "Unauthorized" });
    }

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const bookshelfName: string = req.body.bookshelfName;
    console.log(`POST /api/bookshelf/new_bookshelf - Bookshelf name: ${bookshelfName}`);

    await prisma.userBookshelf.upsert({
        where: {
            user_id_bookshelf_name: {
                user_id: userId,
                bookshelf_name: bookshelfName
            }
        },
        update: {},
        create: {
            user_id: userId,
            bookshelf_name: bookshelfName,
        }
    })
        .then(async (result) => {
            console.log(`Bookshelf created successfully: \n ${JSON.stringify(result)}`);
            return res.status(201).json({ "Created": bookshelfName })
        })
        .catch(async (e) => {
            console.error(e)
            return res.status(500).json({ "Error": "Error creating bookshelf" });
        });
});

/**
 * GET request for retrieving all bookshelves for a user.
 */
router.get('/', async (req: Request, res: Response) => {
    const userId = req.session.user?.userId;
    if (!userId) {
        return res.status(401).send('Unauthorized');
    }

    console.log(`GET /api/bookshelf/bookshelves`);
    const result = await prisma.userBookshelf.findMany({
        where: {
            user_id: userId
        }
    })
    res.status(200).json(result);
})

export default router;