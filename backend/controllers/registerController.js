// controllers/registerController.js
import User from '../model/loginModel.js'

export const register = async (req, res) => {
    const { username, password, role, doctorKey } = req.body;

    try {
        if (!username || !password || !role) {
            return res.status(400).json({ message: 'Bütün xanaları doldurun' });
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(409).json({ message: 'Bu istifadəçi artıq mövcuddur' });
        }

        if (role === 'doctor') {
            if (!doctorKey) {
                return res.status(400).json({ message: 'Həkim açar kodu tələb olunur' });
            }
            if (doctorKey !== process.env.DOCTOR_SECRET_KEY) {
                return res.status(403).json({ message: 'Həkim açarı yalnışdır' });
            }
        }

        const newUser = new User({ username, password, role });
        await newUser.save();

        res.status(201).json({ message: 'Qeydiyyat tamamlandı', username, role });
    } catch (err) {
        console.error('REGISTER ERROR:', err.message);
        res.status(500).json({ message: 'Server xətası baş verdi' });
    }
};
