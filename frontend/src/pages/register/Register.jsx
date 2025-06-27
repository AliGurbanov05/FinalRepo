// Register.jsx

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendOTP, verifyOTP, resetOTPState } from '../../redux/reducers/otpSlice';
import { registerUser } from '../../redux/reducers/registerSlice';
import { useNavigate } from 'react-router-dom';
import style from './Register.module.scss';
import Layout from '../../components/common/layout/Layout';

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        codeSent: otpSent, // 🔄 Bu `state.codeSent`-dən gələcək
        verified: otpVerified,
        loading: otpLoading,
        error: otpError,
    } = useSelector((state) => state.otp);
      

    const {
        loading: regLoading,
        error: regError,
        message: regMessage,
    } = useSelector((state) => state.register);

    // --- Form məlumatları ---
    const [form, setForm] = useState({
        name: '',
        surname: '',
        phone: '',
        fin: '',
        email: '',
        password: '',
        role: 'patient',
        doctorKey: '',
        category: '',
    });

    // --- OTP üçün ---
    const [otpCode, setOtpCode] = useState('');

    // --- Form dəyərlərini idarə et ---
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // --- OTP kodunu göndər ---
    const handleSendOtp = () => {
        if (!form.phone) return alert('Zəhmət olmasa telefon nömrənizi daxil edin');
        dispatch(sendOTP(form.phone));
    };

    // --- OTP kodunu yoxla ---
    const handleVerifyOtp = async () => {
        if (!otpCode) return alert('Zəhmət olmasa OTP kodunu daxil edin');

        const result = await dispatch(verifyOTP({ phone: form.phone, code: otpCode }));

        if (verifyOTP.fulfilled.match(result)) {
            // OTP təsdiqləndi, indi qeydiyyat göndərək
            let payload = { ...form };

            if (payload.role === 'doctor') {
                delete payload.email;
            } else {
                delete payload.doctorKey;
                delete payload.category;
            }

            const regResult = await dispatch(registerUser(payload));
            if (registerUser.fulfilled.match(regResult)) {
                alert('✅ Qeydiyyat uğurla tamamlandı!');
                navigate('/login');
                dispatch(resetOTPState());
            } else {
                alert('Qeydiyyat zamanı xəta baş verdi: ' + regResult.payload || '');
            }
        } else {
            alert('OTP kodu yanlışdır');
        }
    };

    return (
        <Layout>
            <div className={style.registerWrapper}>
                <form className={style.registerForm} onSubmit={(e) => e.preventDefault()}>
                    <h2>Qeydiyyat</h2>

                    {/* --- Əgər OTP göndərilməyibsə və təsdiqlənməyibsə, form göstər --- */}
                    {!otpSent && (
                        <>
                            <input
                                type="text"
                                name="name"
                                placeholder="Ad"
                                value={form.name}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="text"
                                name="surname"
                                placeholder="Soyad"
                                value={form.surname}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="text"
                                name="phone"
                                placeholder="Telefon (məs: +99450XXXXXXX)"
                                value={form.phone}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="text"
                                name="fin"
                                placeholder="FIN"
                                value={form.fin}
                                onChange={handleChange}
                                required
                            />
                            {form.role === 'patient' && (
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={form.email}
                                    onChange={handleChange}
                                    required
                                />
                            )}
                            <input
                                type="password"
                                name="password"
                                placeholder="Şifrə"
                                value={form.password}
                                onChange={handleChange}
                                required
                            />
                            <select name="role" value={form.role} onChange={handleChange} required>
                                <option value="patient">Xəstə</option>
                                <option value="doctor">Həkim</option>
                            </select>
                            {form.role === 'doctor' && (
                                <>
                                    <input
                                        type="text"
                                        name="category"
                                        placeholder="İxtisas"
                                        value={form.category}
                                        onChange={handleChange}
                                        required
                                    />
                                    <input
                                        type="text"
                                        name="doctorKey"
                                        placeholder="Həkim açar kodu"
                                        value={form.doctorKey}
                                        onChange={handleChange}
                                        required
                                    />
                                </>
                            )}

                            <button
                                type="button"
                                onClick={handleSendOtp}
                                disabled={otpLoading}
                            >
                                {otpLoading ? 'Kodu göndərilir...' : 'Növbəti'}
                            </button>

                            {otpError && <p className={style.error}>{otpError}</p>}
                        </>
                    )}

                    {/* --- Əgər OTP kodu göndərilib amma təsdiqlənməyibsə, OTP formu göstər --- */}
                    {otpSent && !otpVerified && (
                        <>
                            <p>Telefonunuza 4 rəqəmli kod göndərildi, zəhmət olmasa daxil edin:</p>
                            <input
                                type="text"
                                placeholder="OTP kodu"
                                value={otpCode}
                                onChange={(e) => setOtpCode(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                onClick={handleVerifyOtp}
                                disabled={otpLoading}
                            >
                                {otpLoading ? 'Yoxlanılır...' : 'Təsdiqlə'}
                            </button>
                            {otpError && <p className={style.error}>{otpError}</p>}
                        </>
                    )}
                </form>
            </div>
        </Layout>
    );
};

export default Register;
