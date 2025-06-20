import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchDoctorDashboard,
  updateDoctorProfile,
  finishAppointment,
  deleteAppointment,
  deleteDoctorAccountThunk
} from '../../../../redux/reducers/doctorSlice';
import { useNavigate } from 'react-router-dom';
import style from './DashBoard.module.scss';
import Layout from '../../../../components/common/layout/Layout';

const DashBoard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { doctor, appointments, loading, error } = useSelector(state => state.doctor);

  const [editField, setEditField] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    phone: ''
  });

  // Giriş və rol yoxlaması, dashboard məlumatları
  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (!token) return navigate('/login');
    if (role !== 'doctor') return navigate('/not-allowed');

    dispatch(fetchDoctorDashboard());
  }, [dispatch, navigate]);

  // doctor məlumatlarını formaya qoyuruq
  useEffect(() => {
    if (doctor) {
      setFormData({
        name: doctor.name || '',
        surname: doctor.surname || '',
        phone: doctor.phone || ''
      });
    }
  }, [doctor]);

  // Profil redaktəsi üçün input dəyişiklikləri
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Redaktəyə başlamaq üçün
  const handleFieldClick = (field) => {
    setEditField(field);
  };

  // Profil yeniləmə funksiyası (blur zamanı)
  const handleSave = async () => {
    try {
      if (editField) {
        const resAction = await dispatch(updateDoctorProfile(formData));
        if (updateDoctorProfile.fulfilled.match(resAction)) {
          setEditField(null);
          alert('Profil məlumatları yeniləndi');
        } else {
          alert('Yeniləmə zamanı xəta baş verdi');
        }
      }
    } catch {
      alert('Yeniləmə zamanı xəta baş verdi');
    }
  };

  const handleBlur = () => {
    handleSave();
  };

  // Görüşü bitirmək
  const handleFinish = (appointmentId) => {
    navigate(`/result/${appointmentId}`);
  };
  

  // Görüşü silmək
  const handleDelete = async (appointmentId) => {
    try {
      await dispatch(deleteAppointment(appointmentId)).unwrap();
      alert('Görüş uğurla silindi');
      dispatch(fetchDoctorDashboard());
    } catch (error) {
      alert('Görüş silinərkən xəta baş verdi: ' + error);
    }
  };

  // Hesabı silmək
  const handleDeleteAccount = async () => {
    if (!window.confirm('Hesabınızı silmək istədiyinizə əminsiniz?')) return;

    try {
      await dispatch(deleteDoctorAccountThunk()).unwrap();
      localStorage.clear();
      navigate('/login');
    } catch (error) {
      alert('Hesab silinərkən xəta baş verdi: ' + error);
    }
  };

  return (
    <Layout>
      <div className={style.dashboard}>
        <h2>Həkim Paneli</h2>

        {loading && <p>Yüklənir...</p>}
        {error && <p className={style.error}>{error}</p>}

        {doctor && (
          <div className={style.content}>
            <section>
              <h3>Profil Məlumatları</h3>

              <p>
                <strong>Ad: </strong>
                {editField === 'name' ? (
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    autoFocus
                    className={style.editable}
                  />
                ) : (
                  <span onClick={() => handleFieldClick('name')}>
                    {formData.name}
                  </span>
                )}
              </p>

              <p>
                <strong>Soyad: </strong>
                {editField === 'surname' ? (
                  <input
                    type="text"
                    name="surname"
                    value={formData.surname}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    autoFocus
                    className={style.editable}
                  />
                ) : (
                  <span onClick={() => handleFieldClick('surname')}>
                    {formData.surname}
                  </span>
                )}
              </p>

              <p>
                <strong>Telefon: </strong>
                {editField === 'phone' ? (
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    autoFocus
                    className={style.editable}
                  />
                ) : (
                  <span onClick={() => handleFieldClick('phone')}>
                    {formData.phone}
                  </span>
                )}
              </p>

              <p><strong>Rol:</strong> {doctor.role}</p>
            </section>

            <section>
              <h3>Aktiv Görüşlər</h3>
              {appointments.filter(app => app.status === 'active').length === 0 ? (
                <p>Aktiv görüş tapılmadı</p>
              ) : (
                <ul className={style.appointmentList}>
                  {appointments
                    .filter(app => app.status === 'active')
                    .map(app => (
                      <li key={app._id} className={style.appointmentItem}>
                        <div>
                          <p key={app._id}>
                            Tarix: {new Date(app.date).toLocaleDateString('az-AZ')}{" "}-{" "}
                            {" "} Saat:{" "}{app.time}
                          </p>
                        </div>
                        <div className={style.buttons}>
                          <button
                            onClick={() => handleFinish(app._id)}
                            className={style.finishButton}
                            disabled={app.status === 'completed'}
                          >
                            Tamamla
                          </button>
                          <button
                            onClick={() => handleDelete(app._id)}
                            className={style.deleteButton}
                          >
                            Sil
                          </button>
                        </div>
                      </li>
                    ))}
                </ul>
              )}
            </section>

            <section>
              <h3>Bitmiş Görüşlər</h3>
              {appointments.filter(app => app.status === 'deactive').length === 0 ? (
                <p>Bitmiş görüş tapılmadı</p>
              ) : (
                <ul className={style.appointmentList}>
                  {appointments
                    .filter(app => app.status === 'deactive')
                    .map(app => (
                      <li key={app._id} className={style.appointmentItem}>
                        <div>
                          <p key={app._id}>
                            Tarix: {new Date(app.date).toLocaleDateString('az-AZ')}{" "}-{" "}
                            {" "} Saat:{" "}{app.time}
                          </p>
                        </div>
                      </li>
                    ))}
                </ul>
              )}
            </section>


            <section className={style.deleteAccountSection}>
              <button
                onClick={handleDeleteAccount}
                className={style.logoutButton}
              >
                Hesabı Sil
              </button>
            </section>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default DashBoard;
