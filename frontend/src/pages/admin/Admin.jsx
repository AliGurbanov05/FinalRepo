import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsers,
  fetchAppointments,
  updateUser,
  deleteUser,
} from "../../redux/reducers/adminSlice";
import Layout from "../../components/common/layout/Layout";
import styles from "./Admin.module.scss";

const Admin = () => {
  const dispatch = useDispatch();
  const { users, appointments, loading, error } = useSelector(
    (state) => state.admin
  );

  const [editUserId, setEditUserId] = useState(null);
  const [editData, setEditData] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
    fin: "",
  });

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchAppointments());
  }, [dispatch]);

  const handleEdit = (user) => {
    setEditUserId(user._id);
    setEditData(user);
  };

  const handleSave = () => {
    dispatch(updateUser({ id: editUserId, updates: editData })).then(() => {
      setEditUserId(null);
    });
  };

  return (
    <Layout>
      <div className={styles.adminPage}>
        <h2>🧑‍⚕️ İstifadəçilər</h2>
        {loading && <p className={styles.loading}>Yüklənir...</p>}
        {error && <p className={styles.error}>{error}</p>}

        <table className={styles.table}>
          <thead>
            <tr>
              <th>Ad</th>
              <th>Soyad</th>
              <th>Email</th>
              <th>Telefon</th>
              <th>FIN</th>
              <th>Rol</th>
              <th className={styles.ms}><p>Əməliyyat</p></th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                {editUserId === u._id ? (
                  <>
                    <td>
                      <input
                        value={editData.name}
                        onChange={(e) =>
                          setEditData({ ...editData, name: e.target.value })
                        }
                      />
                    </td>
                    <td>
                      <input
                        value={editData.surname}
                        onChange={(e) =>
                          setEditData({ ...editData, surname: e.target.value })
                        }
                      />
                    </td>
                    <td>
                      <input
                        value={editData.email}
                        onChange={(e) =>
                          setEditData({ ...editData, email: e.target.value })
                        }
                      />
                    </td>
                    <td>
                      <input
                        value={editData.phone}
                        onChange={(e) =>
                          setEditData({ ...editData, phone: e.target.value })
                        }
                      />
                    </td>
                    <td>
                      <input
                        value={editData.fin}
                        onChange={(e) =>
                          setEditData({ ...editData, fin: e.target.value })
                        }
                      />
                    </td>
                    <td>{u.role}</td>
                    <td>
                      <button
                        onClick={handleSave}
                        className={styles.saveBtn}
                      >
                        Yadda Saxla
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{u.name}</td>
                    <td>{u.surname}</td>
                    <td>{u.email}</td>
                    <td>{u.phone}</td>
                    <td>{u.fin}</td>
                    <td>{u.role}</td>
                      <td className={styles.btns}>
                        <button onClick={() => handleEdit(u)} className={styles.fix}>Düzəliş et</button>
                        <button
                          onClick={() => {
                            if (window.confirm("Bu istifadəçini silmək istədiyinizə əminsiniz?")) {
                              dispatch(deleteUser(u._id));
                            }
                          }}
                          className={styles.delete}
                        >
                          Sil
                        </button>
                      </td>

                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>

        <h2>📅 Görüşlər</h2>
        <table id={styles.tab2} className={styles.table}>
          <thead className={styles.thead}>
            <tr>
              <th>Tarix</th>
              <th>Status</th>
              <th>Sil</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appt) => (
              <tr key={appt._id}>
                <td>{new Date(appt.date).toLocaleString()}</td>
                <td>{appt.status}</td>
                <td className="p-2">
                  <button
                    onClick={() => dispatch(deleteAppointment(appt._id))}
                    className={styles.dlt}
                  >
                    Sil
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Admin;
