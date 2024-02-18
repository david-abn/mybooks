import { Request, Response, NextFunction } from 'express';

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    // Check if user is authenticated
    if (req.session && req.session.user) {
        // User is authenticated, proceed to the next middleware/route handler
        next();
    } else {
        // User is not authenticated, send 401 Unauthorized response
        res.status(401).json({ message: 'Unauthorized' });
    }
};

export default isAuthenticated;