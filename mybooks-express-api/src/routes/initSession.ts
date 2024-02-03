import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', (req: Request, res: Response) => {
    // console.log(res.cookie);
    console.log('init start!');
    console.log(req.headers);
    // @ts-ignore
    req.session.init = 'asd';
    console.log(req.session);
    console.log(req.sessionID);
    res.status(200).send('init');
});

export default router; 