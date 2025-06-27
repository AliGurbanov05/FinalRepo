import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { submitDiagnosis, clearResultState } from '../../redux/reducers/resultSlice';
import { useParams, useNavigate } from 'react-router-dom';

const Result = () => {
    const { appointmentId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, success, error } = useSelector((state) => state.result);

    const [diagnosis, setDiagnosis] = useState('');

    useEffect(() => {
        if (success) {
            dispatch(clearResultState());
            navigate('/doctor/dashboard');
        }
    }, [success, dispatch, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!diagnosis.trim()) return alert("Diaqnoz boş ola bilməz!");

        try {
            await dispatch(submitDiagnosis({ appointmentId, diagnosis })).unwrap();
        } catch (err) {
            alert("Xəta baş verdi: " + err.message);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Görüş Diaqnozu</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <textarea
                        value={diagnosis}
                        onChange={(e) => setDiagnosis(e.target.value)}
                        placeholder="Diaqnoz yazın..."
                        rows="6"
                        cols="60"
                    ></textarea>
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Göndərilir...' : 'Təsdiqlə və Tamamla'}
                </button>
            </form>
            {error && <p style={{ color: 'red' }}>Xəta: {error}</p>}
        </div>
    );
};

export default Result;
