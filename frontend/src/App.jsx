import './App.css';
import Router from './router/Router';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUserData } from './redux/reducers/authSlice';
import axios from 'axios';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      console.log('Frontend token:', token); // əlavə et
      if (token) {
        try {
          const res = await axios.get('http://localhost:8030/users/me', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          dispatch(setUserData(res.data));
        } catch (error) {
          console.error('İstifadəçi məlumatı yüklənmədi:', error);
        }
      }
    };

    fetchUser();
  }, []);
  
  return <Router />;
}

export default App;
