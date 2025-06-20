import React, { useEffect } from 'react';
import Layout from '../../components/common/layout/Layout';
import styles from './Receipt.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Receipt = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const appointment = location.state?.appointment;
    const paymentIntent = location.state?.paymentIntent;

    // Əgər məlumatlar yoxdursa
    if (!appointment || !paymentIntent) {
        return <p>Görüş və ödəniş məlumatları tapılmadı.</p>;
    }

    // Komponent render olunanda email göndər
    useEffect(() => {
        const sendEmail = async () => {
            try {
                await axios.post('http://localhost:8030/email/send-receipt', {
                    appointment,
                    paymentIntent
                });
                console.log('Email göndərildi ✅');
            } catch (err) {
                console.error('Email göndərilmədi ❌', err);
            }
        };

        sendEmail();
    }, []);

    const goHome = () => {
        navigate('/');
    };

    return (
        <Layout>
            <div className={styles.receipt}>
                <h2>Ödəniş Qəbzi</h2>
                <p><strong>Ad:</strong> {appointment.name} {appointment.surname}</p>
                <p><strong>Telefon:</strong> {appointment.phone}</p>
                <p><strong>FIN:</strong> {appointment.fin}</p>
                <p><strong>Kateqoriya:</strong> {appointment.category}</p>
                <p><strong>Görüş vaxtı:</strong> {appointment.date} {appointment.time}</p>
                <p><strong>Ödəniş məbləği:</strong> {(paymentIntent.amount / 100).toFixed(2)} AZN</p>
                <p><strong>Ödəniş statusu:</strong> {paymentIntent.status}</p>

                <button className={styles.homeButton} onClick={goHome}>
                    Ana səhifəyə qayıt
                </button>
            </div>
        </Layout>
    );
};

export default Receipt;
