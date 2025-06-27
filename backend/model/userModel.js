import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    phone: { type: String, required: true },
    fin: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['patient', 'doctor', 'admin'], default: 'patient' },
    category: { type: String },
}, {
    timestamps: true
});

// BU ƏN VACİB SƏTİRDİR:
delete mongoose.connection.models['User'];

const User = mongoose.model('User', userSchema);
export default User;
