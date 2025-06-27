import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
;

const Check = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            const decoded = jwtDecode(token);
            const expiryTime = decoded.exp * 1000; // exp epoch saniyə ilə gəlir, ms-ə çevrilir
            const now = Date.now();

            if (now >= expiryTime) {
                alert('Sessiya müddəti bitdi. Zəhmət olmasa yenidən daxil olun.');
                localStorage.removeItem('token');
                navigate('/login');
            } else {
                const timeout = expiryTime - now;
                setTimeout(() => {
                    alert('Sessiya müddəti bitdi. Zəhmət olmasa yenidən daxil olun.');
                    localStorage.removeItem('token');
                    navigate('/login');
                }, timeout);
            }
        } catch (error) {
            console.error('Token decoding error:', error);
            localStorage.removeItem('token');
            navigate('/login');
        }
    }, [navigate]);
};

export default Check;
