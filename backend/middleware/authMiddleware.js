import jwt from 'jsonwebtoken';
import { errorResponse } from '../utilities/helpers.js';



export function verifyToken(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer')) {        
        errorResponse(res, 401, 'Access denied. No token provided');
    }
    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; 
        next();
    } catch (error) {        
        errorResponse(res, 403, 'Invalid or expired token.');
    }
}


export function authorizeRoles(...allowedRoles) {
    return (req, res, next) => {
        if(!req.user || !allowedRoles.includes(req.user.role)) {            
            errorResponse(res, 403, 'Access denied. Insufficient role.');
        }
        next();
    }
}



