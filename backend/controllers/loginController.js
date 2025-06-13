import User from '../model/loginModel.js';
import generateToken from '../utils/generateToken.js';

export const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'İstifadəçi tapılmadı' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Şifrə yalnışdır' });
        }

        const token = generateToken(user);
        res.status(200).json({ token, role: user.role });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server xətası' });
    }
};
