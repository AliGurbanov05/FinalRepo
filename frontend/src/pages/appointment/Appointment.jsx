import React, { useState, useEffect } from "react";
import styles from "./Appointment.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { createAppointment } from "../../redux/reducers/apponitmentSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/common/layout/Layout";

const Appointement = () => {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token);
    const navigate = useNavigate();
    const [patientInfo, setPatientInfo] = useState(null);

    const [formData, setFormData] = useState({
        date: "",
        time: "",
        category: "",
    });

    useEffect(() => {
        const fetchPatientInfo = async () => {
            try {
                const res = await axios.get("http://localhost:8030/users/me", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setPatientInfo(res.data);
            } catch (err) {
                console.error("Xəstə məlumatı gətirilə bilmədi:", err);
            }
        };

        fetchPatientInfo();
    }, [token]);

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    // Appointment.jsx - görüşü seçəndə
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Appointment yarat
            const res = await dispatch(createAppointment(formData)).unwrap();

            console.log("Created appointment response:", res);

            // Payment səhifəsinə appointment məlumatı ilə yönləndir
            navigate('/payment', { state: { appointment: res.appointment || res } });
        } catch (err) {
            console.error("Appointment yaradılmadı:", err);
        }
    };
    
      

    return (
        <Layout>
            <div className={styles.container}>
                <h2>Görüş Təyin Et</h2>

                {/* İstifadəçi məlumatları */}
                {patientInfo ? (
                    <div className={styles.patientInfo}>
                        <p><strong>Ad:</strong> {patientInfo.name}</p>
                        <p><strong>Soyad:</strong> {patientInfo.surname}</p>
                        <p><strong>Telefon:</strong> {patientInfo.phone}</p>
                        <p><strong>Email:</strong> {patientInfo.email}</p>
                        <p><strong>Fin:</strong> {patientInfo.fin}</p>
                        <p><strong>Rolu:</strong> {patientInfo.role}</p>
                        <p><strong>Qeydiyyat tarixi:</strong> {new Date(patientInfo.createdAt).toLocaleDateString()}</p>
                    </div>
                ) : (
                    <p>Məlumatlar yüklənir...</p>
                )}

                <form onSubmit={handleSubmit} className={styles.form}>
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="time"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        required
                    />
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Kateqoriya seçin</option>
                        <option value="Ginekoloq">Ginekoloq</option>
                        <option value="Lor">Lor</option>
                        <option value="Terapevt">Terapevt</option>
                    </select>
                    <button type="submit">Təyin et</button>
                </form>
            </div>
        </Layout>
    );
};

export default Appointement;
