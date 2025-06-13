import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import style from './Login.module.scss';
import Layout from '../../components/common/layout/Layout';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  const handleLogin = async (e) => {
    e.preventDefault();

    // 1. Admin üçün frontend yoxlama
    if (username === 'Eli' && password === '2025') {
      localStorage.setItem('token', 'admin-static-token'); // istəsən JWT verə bilərik
      localStorage.setItem('role', 'admin');
      navigate('/admin');
      return;
    }

    // 2. Normal istifadəçi girişi
    try {
      const res = await axios.post('http://localhost:8030/login', { username, password });
      const { token, role } = res.data;
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);

      if (role === 'patient') {
        navigate('/patient/dashboard');
      } else if (role === 'doctor') {
        navigate('/doctor/dashboard');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError('İstifadəçi adı və ya şifrə yalnışdır');
    }
  };
  
  return (
    <Layout>
      <div className={style.loginWrapper}>
        <form onSubmit={handleLogin} className={style.loginForm}>
          <h2>Giriş</h2>
          <input
            type="text"
            placeholder="İstifadəçi adı"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Şifrə"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Daxil ol</button>
          {error && <p className={style.error}>{error}</p>}
          <p>
            Hesabın yoxdur?{' '}
            <Link to="/register" className={style.registerLink}>
              Qeydiyyatdan keç
            </Link>
          </p>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
