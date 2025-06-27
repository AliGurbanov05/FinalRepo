import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';


const isTokenExpired = (token) => {
    try {
        const decoded = jwtDecode(token);
        const now = Date.now() / 1000; // saniyə ilə
        return decoded.exp < now;
    } catch (e) {
        return true; // token düzgün decode olmursa belə hesab et expired-dir
    }
};

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (!token || isTokenExpired(token)) {
        // Token yoxdur və ya vaxtı keçib
        localStorage.clear(); // hər şeyi sil
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
