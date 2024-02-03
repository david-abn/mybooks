import express, { Request, Response, NextFunction, Router } from 'express';
import bookRoutes from './routes/books';
import authRoutes from './routes/auth';
import bookshelfRoutes from './routes/bookshelf';
import profileRoutes from './routes/profile';
import fs from "fs";
import https from "https";
import 'dotenv/config';
// import cookieParser from "cookie-parser";
import { dirname } from "node:path";
import { PrismaClient } from '@prisma/client'
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import expressSession from 'express-session';
import initSession from './routes/initSession';
const cors = require('cors');
var cookieParser = require("cookie-parser");


const prisma = new PrismaClient()

const app = express();
const port = process.env.PORT || 4000;

// app.use(cors({
//   origin: true,
//   credentials: true,
// }));

app.use(
  expressSession({
    cookie: {
      sameSite: 'lax',
      // secure: process.env.NODE_ENV === "production",
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // ms
      httpOnly: true,
      path: '/',
      domain: 'localhost',
    },
    secret: 'a santa at nasa',
    resave: false,
    saveUninitialized: true,
    store: new PrismaSessionStore(
      new PrismaClient(),
      {
        checkPeriod: 60 * 60 * 1000,  //1 hour
        dbRecordIdIsSessionId: true,
        dbRecordIdFunction: undefined,
      }
    )
  })
);
app.use(cookieParser());
app.use((_, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://localhost:3000');
  res.header('Access-Control-Allow-Headers', 'content-type');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  // res.header('Access-Control-Expose-Headers', 'Set-Cookie');
  next();
})

app.set('trust proxy', 1)



// app.use(function (req, res, next) {
//   // @ts-ignore
//   req.session.test = "test";
//   next();
// });
// if (process.env.NODE_ENV !== "production") {

// }
// allow cors from all - no hustle and never safe

app.use(express.json()); // Add this line to enable JSON parsing in the request body
// app.use('/', initSession)

app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/bookshelf', bookshelfRoutes);
app.use('/api/profile', profileRoutes);


app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong');
});
const rootDir = dirname(process.argv[1]);

https
  .createServer(
    {
      key: fs.readFileSync(rootDir + "/server.key"),
      cert: fs.readFileSync(rootDir + "/server.cert"),
    },
    app
  )
  .listen(port, function () {
    console.log(
      `Server running at https://localhost:${port}`
    );
  });

// app.listen(port, () => {
//     console.log(`Server running at http://localhost:${port}`);
// }); 