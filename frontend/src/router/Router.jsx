import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/home/Home';
import Admin from '../pages/admin/Admin';
import Basket from '../pages/basket/Basket';
import Not from '../pages/not/Not';
import ProductDetails from '../pages/details/ProductDetails';
import Login from '../pages/login/Login';
import Register from '../pages/register/Register';
import ProtectedRoute from './components/ProtectedRoute';
import PatientDashboard from '../pages/dashboards/patient/dashboard/DashBoard'; // öz yolunuza görə düzəldin
import DoctorDashBoard from '../pages/dashboards/doctor/dashboard/DashBoard';
import Doctors from '../pages/doctors/Doctors';
import Departament from '../pages/departament/Departament';
import Blog from '../pages/blog/Blog';
import Payment from '../pages/payment/Payment';
import Receipt from '../pages/receipt/Receipt';
import Appointement from '../pages/appointment/Appointment';
import Result from '../pages/result/Result';
// import DoctorDashboard from '../pages/dashboard/DoctorDashboard'; // öz yolunuza görə düzəldin

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Açıq səhifələr */}
                <Route path='/' element={<Home />} />
                <Route path='/blog' element={<Blog />} />
                <Route path='/login' element={<Login />} />
                <Route path='/doctors' element={<Doctors />} />
                <Route path='/register' element={<Register />} />
                <Route path='/departament' element={<Departament />} />
                <Route path='/details/:id' element={<ProductDetails />} />

                {/* Qorunan səhifələr */}
                <Route
                    path='/admin'
                    element={
                        <ProtectedRoute allowedRoles={['admin'] /* əgər admin rolunuz varsa */}>
                            <Admin />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path='/basket'
                    element={
                        <ProtectedRoute>
                            <Basket />
                        </ProtectedRoute>
                    }
                />

                {/* Xəstə Dashboard */}
                <Route
                    path='/patient/dashboard'
                    element={
                        <ProtectedRoute allowedRoles={['patient']}>
                            <PatientDashboard />
                        </ProtectedRoute>
                    }
                />

                {/* Həkim Dashboard */}
                <Route
                    path='/doctor/dashboard'
                    element={
                        <ProtectedRoute allowedRoles={['doctor']}>
                            <DoctorDashBoard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='/payment'
                    element={
                        <ProtectedRoute allowedRoles={['patient']}>
                            <Payment />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='/receipt'
                    element={
                        <ProtectedRoute allowedRoles={['patient']}>
                            <Receipt />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='/result/:appointmentId'
                    element={
                        <ProtectedRoute allowedRoles={['doctor']}>
                            <Result/>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='/appointment'
                    element={
                        <ProtectedRoute allowedRoles={['patient']}>
                            <Appointement />
                        </ProtectedRoute>
                    }
                />

                {/* 404 səhifəsi */}
                <Route path='*' element={<Not />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
