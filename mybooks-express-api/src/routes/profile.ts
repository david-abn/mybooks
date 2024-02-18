import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const router = Router();

/**
 * Retrieve user's profile based on user id provided in query.
 *  * @query_param {number} user_id - User ID to retrieve books from
 */
router.get('/', async (req: Request, res: Response) => {
    console.log('GET - /api/profile/')
    const userIdQuery: string = req.query.user_id as string;
    console.log(userIdQuery);
    if (!userIdQuery || typeof userIdQuery !== 'string') {
        return res.status(400).send('Please provide valid user id as string.')
    }
    const userId = parseInt(userIdQuery);
    // const userId = req.session.user?.userId;
    // if (!req.session.user) {
    //     return res.status(401).send('Please sign in first.');
    // }
    let user = await prisma.users.findUnique({ where: { user_id: userId } });
    res.status(200).send(user);
});

export default router; 