
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
 * @param {array} bookValidationRules - Rules to sanitize and validate user input
 */
router.post('/new_bookshelf', bookshelfValidationRules, async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const bookshelfName: string = req.body.bookshelfName;
    console.log(`POST /api/bookshelf/new_bookshelf - Bookshelf name: ${bookshelfName}`);

    await prisma.user_bookshelf.create({
        data: {
            bookshelf_name: bookshelfName,
            user_id: 1, // change this
        }
    })
        .then(async (result) => {
            console.log(`Bookshelf created successfully: \n ${JSON.stringify(result)}`);
            res.status(201).send(`Bookshelf created successfully: ${bookshelfName}.`)
        })
        .catch(async (e) => {
            console.error(e)
            res.status(500).send('Error creating bookshelf');
        });
    await prisma.$disconnect;

});

/**
 * GET request for retrieving all bookshelves for a user.
 */
router.get('/', async (req: Request, res: Response) => {
    console.log(`GET /api/bookshelf/bookshelves`);
    const result = await prisma.user_bookshelf.findMany({
        where: {
            user_id: 1, // change this
        }
    })
await prisma.$disconnect;
    res.status(200).json(result);

})
export default router;