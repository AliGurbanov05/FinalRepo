import jwt from 'jsonwebtoken';

const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET || 'my_secret_key',
        { expiresIn: '10m' }
    );
};

export default generateToken;
