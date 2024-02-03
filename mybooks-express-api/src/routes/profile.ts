import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    if (!req.session.user) {
        return res.status(401).send('Please sign in first.');
    }
    let user = await prisma.users.findFirst({ where: { user_id: req.session.user.userId } });
    res.status(200).send(user);
});

export default router; 