import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../redux/reducers/registerSlice';
import { useNavigate } from 'react-router-dom';
import style from './Register.module.scss';
import Layout from '../../components/common/layout/Layout';

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, user, message } = useSelector(state => state.register);

    const initialFormState = {
        name: '',
        surname: '',
        phone: '',
        fin: '',
        email: '',
        password: '',
        role: 'patient',
        doctorKey: '',
        category: ''
    };

    const [form, setForm] = useState(initialFormState);
    
    
      

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = { ...form };

        // Əgər rol doctor-dursa email göndərmə və category tələb olunur
        if (form.role === 'doctor') {
            delete payload.email; // həkimdə email olmamalıdır
        }

        // Əgər rol patient-dirsə, doctorKey və category lazım deyil
        if (form.role === 'patient') {
            delete payload.doctorKey;
            delete payload.category;
        }

        dispatch(registerUser(payload));
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
                        placeholder="Telefon"
                        value={form.phone}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="fin"
                        placeholder="Fin"
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
                        <>
                            <input
                                type="text"
                                name="category"
                                placeholder="İxtisas (məs: Lor)"
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

                    <button type="submit" disabled={loading}>
                        {loading ? 'Göndərilir...' : 'Qeydiyyatdan keç'}
                    </button>

                    {error && <p className={style.error}>{error}</p>}
                    {user?.message && <p className={style.success}>{message}</p>}
                </form>
            </div>
        </Layout>
    );
};

export default Register;
