import Layout from '../../components/common/layout/Layout';
import styles from './Receipt.module.scss';  // Sass modul kimi istifadə
import { useLocation, useNavigate } from 'react-router-dom';

const Receipt = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const appointment = location.state?.appointment;
    const paymentIntent = location.state?.paymentIntent;

    if (!appointment || !paymentIntent) {
        return <p>Görüş və ödəniş məlumatları tapılmadı.</p>;
    }

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
