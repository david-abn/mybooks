import express, { Request, Response, NextFunction } from 'express';
import bookRoutes from './routes/books';
import authRoutes from './routes/auth';
import bookshelfRoutes from './routes/bookshelf';
import profileRoutes from './routes/profile';
import dashboardRoutes from './routes/dashboard';
import fs from "fs";
import https from "https";
import 'dotenv/config';
import { dirname } from "node:path";
import { PrismaClient } from '@prisma/client'
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import expressSession from 'express-session';
import isAuthenticated from './middleware/authMiddleware';

const app = express();
const port = process.env.PORT || 4000;

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
    saveUninitialized: false,
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


app.use((_, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://mybooks.fit');
  res.header('Access-Control-Allow-Headers', 'content-type');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE');
  next();
})

app.use(express.json()); // Add this line to enable JSON parsing in the request body
// Add authentication to routes that are protected.
app.use('/api/auth', authRoutes);
app.use('/api/books', isAuthenticated, bookRoutes);
app.use('/api/bookshelf', isAuthenticated, bookshelfRoutes);
app.use('/api/profile', isAuthenticated, profileRoutes);
app.use('/api/dashboard', isAuthenticated, dashboardRoutes);

// Define a health check endpoint
app.use('/health', (req, res) => {
  res.status(200).send('OK'); // Respond with a status code of 200 and 'OK'
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong');
});
const rootDir = dirname(process.argv[1]);

if (process.env.NODE_ENV === 'production') {
  app.listen(port, () => {
    console.log(`Server is running on port https://localhost:${port}`);
  });
}
else {
  console.log('NODE_ENV is not production. Running dev env');

  const keyPath = rootDir + "/server.key";
  const certPath = rootDir + "/server.cert";
  if (fs.existsSync(keyPath) && fs.existsSync(certPath)) {
    https
      .createServer(
        {
          key: fs.readFileSync(keyPath),
          cert: fs.readFileSync(certPath),
        },
        app
      )
      .listen(port, function () {
        console.log(
          `Server running at https://localhost:${port}`
        );
      });
  }
}