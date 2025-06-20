import jwt from 'jsonwebtoken'
import User from "../model/userModel.js"


export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) return res.status(403).json({ message: "Token etibarsızdır" });
            req.user = user; // burada user obyekti token-dan gəlir
            next();
        });
    } else {
        return res.status(401).json({ message: "Token tapılmadı" });
    }
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

export const protect = async (req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findById(decoded.id).select('-password');

            if (!user) {
                return res.status(401).json({ message: 'İstifadəçi tapılmadı' });
            }

            req.user = user;  // Burada tam user obyektini qoyuruq
            next();
        } catch (error) {
            console.error('Token xətası:', error);
            return res.status(401).json({ message: 'Token etibarsızdır' });
        }
    } else {
        return res.status(401).json({ message: 'Token mövcud deyil' });
    }
  };
