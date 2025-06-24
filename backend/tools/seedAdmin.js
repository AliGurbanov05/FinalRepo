// tools/seedAdmin.js
import mongoose from 'mongoose';
import User from '../model/loginModel.js'; // Yolu düzgün ver

mongoose.connect('mongodb://localhost:27017/medone')
    .then(async () => {
        const existing = await User.findOne({ name: 'Eli' });
        if (existing) {
            console.log("Eli artıq mövcuddur");
            return process.exit();
        }

        const admin = new User({
            name: 'Eli',
            password: '2025',
            role: 'admin'
        });

        await admin.save();
        console.log("Admin istifadəçi yaradıldı");
        process.exit();
    })
    .catch(err => {
        console.error("Xəta:", err);
        process.exit(1);
    });
