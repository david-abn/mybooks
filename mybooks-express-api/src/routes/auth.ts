import { Router, Request, Response } from 'express';
// import { authenticateUser } from '../controllers/auth.controller';
import { OAuth2Client } from "google-auth-library";
import { PrismaClient } from '@prisma/client'
import { User } from '../models/user';
const router = Router();
const prisma = new PrismaClient()


const googleClient = new OAuth2Client({
    clientId: `${process.env.GOOGLE_CLIENT_ID}`,
});

declare module 'express-session' {
    interface SessionData {
        user: User
    }
}
router.post("/signin", async (req: Request, res: Response) => {
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
    console.log(payload);
    let user = await prisma.users.findFirst({ where: { user_email: payload?.email } });
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
        userFirstName: user.user_first_name,
        userFamilyName: user.user_family_name,
        userFullName: user.user_full_name,
        userPicture: user.user_picture
    }
    console.log(req.session);
    console.log(req.sessionID);
    res.status(200).send('login success');

});


router.get("/signout", (req: Request, res: Response) => {
    req.session.destroy((err) => {
        if (err) {
            console.error(`Failed to sign out: ${err}`)
            res.status(500).json({ error: "Failed to sign out" });
        } else {
            console.log('Sign out successful')
            // res.clearCookie("connect.sid"); // Clear the session cookie
            res.status(200).json({ message: "Signed out successfully" });
        }
        console.log(req.session);
    });
});

export default router;