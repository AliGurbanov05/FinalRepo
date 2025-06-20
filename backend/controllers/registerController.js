// controllers/registerController.js
import User from '../model/userModel.js'
import bcrypt from 'bcryptjs';

export const register = async (req, res) => {
    const hashPassword = async (password) => {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    };

    console.log("Register body:", req.body);

    const { name, surname, phone, fin, email, password, role, category, doctorKey } = req.body;

    try {
        if (role === 'patient' && !email) {
            return res.status(400).json({ message: 'Xəstə üçün email vacibdir' });
        }

        const existingUser = await User.findOne({ name });
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

        const hashedPassword = await hashPassword(password);

        const newUser = new User({
            name,
            surname,
            phone,
            fin,
            email: role === 'patient' ? email : undefined,
            password: hashedPassword,
            role,
            category: role === 'doctor' ? category : undefined
        });

        await newUser.save();

        console.log("Saved user:", newUser);

        return res.status(201).json({ message: 'Qeydiyyat tamamlandı' });
    } catch (err) {
        console.error('REGISTER ERROR:', err.message);
        return res.status(500).json({ message: 'Server xətası baş verdi' });
    }
};



