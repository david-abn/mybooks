import { Request, Response, NextFunction } from 'express';

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    // Allow OPTIONS requests
    if (req.method == "OPTIONS") return next();

    // Check if user is authenticated
    if (req.session && req.session.user) {
        // User is authenticated, proceed to the next middleware/route handler
        next();
    } else {
        // User is not authenticated, send 401 Unauthorized response
        console.log('Unauthorized', req.session?.user, req.route?.path, req?.method)
        return res.status(401).json({ message: 'Unauthorized' });
    }
};

export default isAuthenticated;