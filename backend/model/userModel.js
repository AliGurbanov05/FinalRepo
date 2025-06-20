import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String, // 👈 firstname kimi istifadə olunur
        required: true,
    },
    surname: {
        type: String, // 👈 lastname kimi istifadə olunur
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['patient', 'doctor', 'admin'],
        default: 'patient',
    },
    category: {
        type: String, // 👈 yalnız doctor üçün əlavə olunur
    },
}, {
    timestamps: true
});

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;

