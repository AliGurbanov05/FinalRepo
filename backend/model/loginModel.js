import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['patient', 'doctor','admin'],
        required: true,
    },
}, { timestamps: true });

// Şifrəni qeyd etməzdən əvvəl hash et
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Giriş zamanı şifrəni yoxlamaq üçün metod
UserSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.password);
};

// Modeli export et
const User = mongoose.model('User', UserSchema);
export default User;
