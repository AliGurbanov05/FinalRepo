import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../redux/reducers/registerSlice';
import { useNavigate } from 'react-router-dom';
import style from './Register.module.scss';
import Layout from '../../components/common/layout/Layout';

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error, user } = useSelector((state) => state.register);

    const [form, setForm] = useState({
        username: '',
        password: '',
        role: 'patient',
        doctorKey: ''
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(registerUser(form));
    };

    useEffect(() => {
        if (user?.message === 'Qeydiyyat tamamlandı') {
            const timeout = setTimeout(() => navigate('/login'), 1500);
            return () => clearTimeout(timeout);
        }
    }, [user, navigate]);

    return (
        <Layout>
            <div className={style.registerWrapper}>
                <form className={style.registerForm} onSubmit={handleSubmit}>
                    <h2>Qeydiyyat</h2>

                    <input
                        type="text"
                        name="username"
                        placeholder="İstifadəçi adı"
                        value={form.username}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Şifrə"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />

                    <select
                        name="role"
                        value={form.role}
                        onChange={handleChange}
                        required
                    >
                        <option value="" disabled>Rolunuzu seçin</option>
                        <option value="patient">Xəstə</option>
                        <option value="doctor">Həkim</option>
                    </select>

                    {form.role === 'doctor' && (
                        <input
                            type="text"
                            name="doctorKey"
                            placeholder="Həkim açar kodu"
                            value={form.doctorKey}
                            onChange={handleChange}
                            required
                        />
                    )}

                    <button type="submit" disabled={loading}>
                        {loading ? 'Göndərilir...' : 'Qeydiyyatdan keç'}
                    </button>

                    {error && <p className={style.error}>{error}</p>}
                    {user?.message && <p className={style.success}>{user.message}</p>}
                </form>
            </div>
        </Layout>
    );
};

export default Register;
