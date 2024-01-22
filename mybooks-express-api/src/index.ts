import express, { Request, Response, NextFunction } from 'express';
import bookRoutes from './routes/books';
import authRoutes from './routes/auth';
import bookshelfRoutes from './routes/bookshelf';

const app = express();
const port = process.env.PORT || 4000;

if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
  }  

app.use(express.json()); // Add this line to enable JSON parsing in the request body
app.use('/api/books', bookRoutes);
app.use('/api/bookshelf', bookshelfRoutes)

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, TypeScript Express!');
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong');
  });
  

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}); 