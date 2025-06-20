import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../components/common/layout/Layout';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './Payment.module.scss';
import { createPaymentIntent } from '../../redux/reducers/paymentSlice';
import { createAppointment } from '../../redux/reducers/apponitmentSlice'; // bu hissə əlavə olundu!
import { useLocation } from 'react-router-dom';
const Payment = () => {
    const dispatch = useDispatch();
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const location = useLocation();
    const appointment = location.state?.appointment;
    console.log("Location state:", location.state);

    if (!appointment) {
        return <p>Görüş məlumatı tapılmadı.</p>;
    }
    const formData = location.state?.formData;
    const patientInfo = useSelector(state => state.auth.user); // yaxud fetch elə

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        try {
            const resAction = await dispatch(createPaymentIntent(5000));

            if (createPaymentIntent.fulfilled.match(resAction)) {
                const clientSecret = resAction.payload.clientSecret;

                const result = await stripe.confirmCardPayment(clientSecret, {
                    payment_method: {
                        card: elements.getElement(CardElement),
                    },
                });

                if (result.error) {
                    alert(result.error.message);
                } else if (result.paymentIntent && result.paymentIntent.status === 'succeeded') {
                    alert('Ödəniş uğurla tamamlandı');

                    // Appointment yaradılması burda OLMAMALIdır!

                    // Appointment məlumatını state-dən alırıq
                    const appointment = location.state.appointment;

                    // Receipt səhifəsinə appointment və payment məlumatları ilə yönləndiririk
                    navigate('/receipt', { state: { appointment, paymentIntent: result.paymentIntent } });
                }
            } else {
                alert('Ödəniş niyyəti alınmadı');
            }
        } catch (err) {
            alert('Xəta baş verdi');
        }
    };
    
    
    return (
        <Layout>
            <form className={styles.paymentForm} onSubmit={handleSubmit}>
                <h2 className={styles.title}>Ödəniş et (50 AZN)</h2>
                <div className={styles.cardElementWrapper}>
                    <CardElement options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#32325d',
                                '::placeholder': { color: '#a0aec0' },
                                fontFamily: 'Roboto, sans-serif',
                            },
                            invalid: {
                                color: '#fa755a',
                            },
                        }
                    }} />
                </div>
                <button className={styles.payButton} type="submit" disabled={!stripe}>
                    Ödəniş et
                </button>
            </form>
        </Layout>
    );
};

export default Payment;
