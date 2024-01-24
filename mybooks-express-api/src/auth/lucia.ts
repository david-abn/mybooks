
import { lucia } from "lucia";
import { PrismaClient, Prisma, bookshelf_books } from '@prisma/client'
import { prisma } from "@lucia-auth/adapter-prisma";
import { express } from "lucia/middleware";
import { google } from "@lucia-auth/oauth/providers";
import dotenv from "dotenv";

const client = new PrismaClient();

dotenv.config();
// expect error (see next section)
export const auth = lucia({
    env: process.env.NODE_ENV === "development" ? "DEV" : "PROD",
    middleware: express(),
    adapter: prisma(client),
    getUserAttributes: (data) => {
        return {
            googleUsername: data.username
        };
    }
});

export const googleAuth = google(auth, {
    clientId: process.env.GOOGLE_CLIENT_ID ?? "",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    redirectUri: 'localhost:4000/'
});

export type Auth = typeof auth;

