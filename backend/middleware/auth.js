import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Token tapılmadı, daxil olun' });
    }

    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET || 'my_secret_key', (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Token etibarsızdır və ya vaxtı bitib' });
        }
        req.user = decoded; // { id, role, iat, exp }
        next();
    });
};

// role yoxlama middleware (multiple rol üçün array dəstəyi var)
export const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Bu əməliyyata icazəniz yoxdur' });
        }
        next();
    };
};

