import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (!token) {
        // Token yoxdursa login səhifəsinə göndər
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
        // İcazə verilən rollar yoxdursa və ya user-in rolu uyğun gəlmirsə yönləndir
        return <Navigate to="/" replace />;
    }

    // Əgər hər şey qaydasındadırsa, uşaqları göstər
    return children;
};

export default ProtectedRoute;
