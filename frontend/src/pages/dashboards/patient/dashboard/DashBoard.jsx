import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPatientDashboard, fetchPatientAppointments, updatePatientDashboard, deletePatientAccountThunk } from '../../../../redux/reducers/dashboardSlice';
import { useNavigate } from 'react-router-dom';
import style from './DashBoard.module.scss';
import axios from 'axios';
import Layout from '../../../../components/common/layout/Layout';

const DashBoard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { data, appointments, responses = [], loading, error } = useSelector(state => state.dashboard);


    useEffect(() => {
        dispatch(fetchPatientDashboard());
        dispatch(fetchPatientAppointments());
    }, [dispatch]);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        phone: ''
    });

    useEffect(() => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');
        if (!token) return navigate('/login');
        if (role !== 'patient') return navigate('/not-allowed');

        dispatch(fetchPatientDashboard());
        dispatch(fetchPatientAppointments());
    }, [dispatch, navigate]);


    const user = useSelector((state) => state.auth.user);
    console.log('Görüşlər:', appointments);
    console.log('Diaqnozlar:', responses);


    useEffect(() => {
        console.log('Dashboard data:', data);
        if (data) {
            setFormData({
                name: data.user?.name || data.name || '',
                surname: data.user?.surname || data.surname || '',
                phone: data.user?.phone || data.phone || '',
                email: data.user?.email || data.email || '',
            });
        }
    }, [data]);






    const handleSave = async () => {
        setMessage('');
        try {
            const resAction = await dispatch(updatePatientDashboard(formData));
            if (updatePatientDashboard.fulfilled.match(resAction)) {
                setMessage('Məlumatlar uğurla yeniləndi!');
                setEditMode(false);
            } else {
                setMessage('Yeniləmə zamanı xəta baş verdi.');
            }
        } catch (err) {
            setMessage('Yeniləmə zamanı xəta baş verdi.');
        }
    };

    const handleLogoutAndDelete = async () => {
        try {
            await dispatch(deletePatientAccountThunk()).unwrap();
            // Hesab uğurla silindikdən sonra
            localStorage.clear();
            navigate('/login'); // login səhifəsinə yönləndir
        } catch (error) {
            alert('Hesab silinərkən xəta baş verdi: ' + error);
        }
    };

    const handleCancel = () => {
        setEditMode(false);
        if (data) {
            setFormData({
                name: data.user?.name || data.name || '',
                surname: data.user?.surname || data.surname || '',
                phone: data.user?.phone || data.phone || '',
                email: data.user?.email || data.email || '',
            });
        }
    };


    const handleFieldClick = () => {
        setEditMode(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <Layout>
            <div className={style.dashboard}>
                <h2>Xəstə Paneli</h2>

                {loading && <p>Yüklənir...</p>}
                {error && <p className={style.error}>{error}</p>}

                {data && (
                    <div className={style.content}>
                        <section>
                            <h3>Profil Məlumatları</h3>

                            <p onClick={handleFieldClick}>
                                <strong>Ad: </strong>
                                {editMode ? (
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className={style.editable}
                                    />
                                ) : (
                                    formData.name
                                )}
                            </p>

                            <p onClick={handleFieldClick}>
                                <strong>Soyad: </strong>
                                {editMode ? (
                                    <input
                                        type="text"
                                        name="surname"
                                        value={formData.surname}
                                        onChange={handleInputChange}
                                        className={style.editable}
                                    />
                                ) : (
                                    formData.surname
                                )}
                            </p>

                            <p onClick={handleFieldClick}>
                                <strong>Telefon: </strong>
                                {editMode ? (
                                    <input
                                        type="text"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className={style.editable}
                                    />
                                ) : (
                                    formData.phone
                                )}
                            </p>
                            <p onClick={handleFieldClick}>
                                <strong>Email: </strong>
                                {editMode ? (
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className={style.editable}
                                    />
                                ) : (
                                    formData.email // burda email göstərilməlidir
                                )}
                            </p>

                            <p><strong>Rol:</strong> {data.role}</p>

                            {editMode && (
                                <div className={style.editButtons}>
                                    <button onClick={handleSave}>Yadda saxla</button>
                                    <button onClick={handleCancel}>Ləğv et</button>
                                </div>
                            )}
                        </section>

                        <section>
                            <h3>Görüşlər</h3>
                            {appointments.filter(app => app.status === 'active').length === 0 ? (
                                <p>Aktiv görüş tapılmadı</p>
                            ) : (
                                <ul>
                                    {appointments
                                        .filter(app => app.status === 'active')
                                        .map(app => (
                                            <li key={app._id}>
                                                <p key={app._id}>
                                                    Tarix: {new Date(app.date).toLocaleDateString('az-AZ')}{" "}-{" "}
                                                    {" "} Saat:{" "}{app.time}
                                                </p>
                                            </li>
                                        ))}
                                </ul>
                            )}
                        </section>

                        <section>
                            <h3>Kecmiş Görüşlər</h3>
                            {appointments.filter(app => app.status === 'deactive').length === 0 ? (
                                <p>Kecmiş görüş tapılmadı</p>
                            ) : (
                                <ul>
                                    {appointments
                                        .filter(app => app.status === 'deactive')
                                        .map(app => (
                                            <li key={app._id}>
                                                Tarix: {new Date(app.date).toLocaleDateString('az-AZ')}{" "}-{" "}
                                                {" "} Saat:{" "}{app.time}
                                            </li>
                                        ))}
                                </ul>
                            )}
                        </section>


                        <section>
                            <h3>Diaqnozlar</h3>
                            {responses.length === 0 ? (
                                <p>Diaqnoz tapılmadı</p>
                            ) : (
                                <ul>
                                    {responses.map(resp => {
                                        const app = appointments.find(a => a._id === resp.appointmentId || a._id === resp.appointmentId?._id);
                                        return (
                                            <li key={app._id}>
                                                Tarix: {new Date(app.date).toLocaleDateString('az-AZ')}{" "}-{" "}
                                                {" "} Saat:{" "}{app.time}
                                            </li>
                                        );
                                    })}
                                </ul>
                            )}
                        </section>

                    </div>
                )}

                <div className={style.logout}>
                    <button onClick={handleLogoutAndDelete} className={style.logoutButton}>
                        Hesabı Sil
                    </button>
                </div>
            </div>
        </Layout>
    );
};

export default DashBoard;
