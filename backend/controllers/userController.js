import User from '../model/userModel.js';

export const getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'İstifadəçi tapılmadı' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'Server xətası' });
    }
};
