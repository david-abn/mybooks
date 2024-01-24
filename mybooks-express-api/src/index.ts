import express, { Request, Response, NextFunction } from 'express';
import bookRoutes from './routes/books.ts';
import authRoutes from './routes/auth.ts';
import bookshelfRoutes from './routes/bookshelf.ts';
import fs from "fs";
import https from "https";
import path from "path";
import 'dotenv/config';
import { dirname } from "node:path";

const app = express();
const port = process.env.PORT || 4000;

if (process.env.NODE_ENV !== "production") {

}

app.use(express.json()); // Add this line to enable JSON parsing in the request body
app.use('/api/books', bookRoutes);
app.use('/api/bookshelf', bookshelfRoutes);
app.use('/', authRoutes);


// allow cors from all - no hustle and never safe
app.use((_, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
})


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