import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', (req: Request, res: Response) => {
    // console.log(res.cookie);
    console.log('profile start!');
    console.log(req.headers);
    // @ts-ignore
    req.session.test = 'asd';
    console.log(req.session);
    console.log(req.sessionID);
    res.status(200).send('profile');
});

export default router; 