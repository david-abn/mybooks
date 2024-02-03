// import { Request, Response } from "express";
// import { OAuth2Client } from "google-auth-library";
// import { PrismaClient } from '@prisma/client'
// import { body, validationResult } from 'express-validator';
// import internal from "stream";

// const prisma = new PrismaClient()


// const googleClient = new OAuth2Client({
//     clientId: `${process.env.GOOGLE_CLIENT_ID}`,
// });

// declare module 'express-session' {
//     interface SessionData {
//         user: {
//             userId: number;
//             email: string;
//         }
//     }
// }

// export const authenticateUser = async (req: Request, res: Response) => {
//     const { token } = req.body;
//     console.log('auth start');

//     const ticket = await googleClient.verifyIdToken({
//         idToken: token,
//         audience: `${process.env.GOOGLE_CLIENT_ID}`,
//     });

//     const payload = ticket.getPayload();
//     if (!payload?.email) {
//         return;
//     }
//     console.log(payload);
//     let user = await prisma.users.findFirst({ where: { user_email: payload?.email } });
//     if (!user) {
//         user = await prisma.users.create({
//             data: {
//                 user_email: payload?.email,
//                 user_first_name: payload?.given_name,
//                 user_family_name: payload?.family_name,
//                 user_full_name: payload?.name,
//                 user_picture: payload?.picture,
//                 oauth_provider: 'Google'
//             }
//         });
//     }
//     console.log(user);
//     // req.session.user = 'asdasd';
//     // req.session.user = {
//     //     userId: 1,
//     //     email: 'emal',
//     // }
//     // console.log(req.session);
//     // console.log(req.sessionID);
//     // @ts-ignore
//     req.session.test = 'asdASDASDAD';

//     res.status(200).send('login success');

//     // res.send();
// };
