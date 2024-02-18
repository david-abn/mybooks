import { Router, Request, Response } from 'express';
// import { authenticateUser } from '../controllers/auth.controller';
import { OAuth2Client } from "google-auth-library";
import { PrismaClient } from '@prisma/client'
import { UserSession } from '../models/user';
const router = Router();
const prisma = new PrismaClient()


const googleClient = new OAuth2Client({
    clientId: `${process.env.GOOGLE_CLIENT_ID}`,
});

declare module 'express-session' {
    interface SessionData {
        user: UserSession
    }
}
/**
 * Client sends a request to check if the user is authenticated.
 */
router.get('/check', async (req: Request, res: Response) => {
    console.log('GET - /api/auth/check');
    if (!req.session.user) {
        // User is not authenticated
        return res.status(401).json({ message: 'Unauthorized' });
    }
    // User is authenticated
    const user = await prisma.users.findUnique({ where: { user_id: req.session.user.userId } });
    res.status(200).json({ user });
})


router.post("/signin", async (req: Request, res: Response) => {
    console.log('POST - /api/auth/signin')
    const { token } = req.body;
    const ticket = await googleClient.verifyIdToken({
        idToken: token,
        audience: `${process.env.GOOGLE_CLIENT_ID}`,
    });

    const payload = ticket.getPayload();
    if (!payload?.email) {
        console.error('Email is null from paypload.');
        return;
    }
    let user = await prisma.users.findUnique({ where: { user_email: payload?.email } });
    console.log(user);
    if (!user) {
        user = await prisma.users.create({
            data: {
                user_email: payload?.email,
                user_first_name: payload?.given_name,
                user_family_name: payload?.family_name,
                user_full_name: payload?.name,
                user_picture: payload?.picture,
                oauth_provider: 'Google'
            }
        });
    }
    req.session.user = {
        userId: user.user_id,
        userEmail: user.user_email,
    }
    console.log(req.session);
    res.status(200).send(req.session.user);

});


router.get("/signout", (req: Request, res: Response) => {
    req.session.destroy((err) => {
        if (err) {
            console.error(`Failed to sign out: ${err}`)
            res.status(500).json({ error: "Failed to sign out" });
        } else {
            console.log('Sign out successful')
            res.clearCookie('connect.sid', { path: '/', domain: 'localhost', httpOnly: true, sameSite: 'lax', secure: true });
            res.end();
        }
        console.log(req.session);
    });

});

export default router;