// pages/patient/Dashboard.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPatientDashboard } from '../../../../redux/reducers/dashboardSlice';
import { useNavigate } from 'react-router-dom';
import style from './DashBoard.module.scss';
import Layout from '../../../../components/common/layout/Layout';
import Check from "../../components/check/Check.js"
const DashBoard = () => {
    Check();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('user'); // Əgər saxlayırsansa
        navigate('/login');
    };
    const { data, loading, error } = useSelector(state => state.dashboard);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');
        if (!token) return navigate('/login');
        if (role !== 'patient') return navigate('/not-allowed');
        dispatch(fetchPatientDashboard());
    }, [dispatch]);

    return (
        <Layout>
            <div className={style.dashboard}>
                <h2>Xəstə Paneli</h2>

                {loading && <p>Yüklənir...</p>}
                {error && <p className={style.error}>{error}</p>}

                {data && (
                    <div className={style.content}>
                        <section className={style.profile}>
                            <h3>Profil Məlumatları</h3>
                            <p><strong>İstifadəçi:</strong> {data.user.username}</p>
                            <p><strong>Rol:</strong> {data.user.role}</p>
                        </section>

                        <section className={style.results}>
                            <h3>Analiz Nəticələri</h3>
                            {data.results.length > 0 ? (
                                <ul>
                                    {data.results.map((item, index) => (
                                        <li key={index}>
                                            <strong>{item.name}</strong> - {item.value} {item.unit}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>Hələ analiz nəticəsi yoxdur.</p>
                            )}
                        </section>
                    </div>
                )}
                <div className={style.logout}>
                    <button className={style.logoutButton} onClick={handleLogout}>Hesabdan cix</button>
                </div>
            </div>
        </Layout>
    );
};

export default DashBoard;
