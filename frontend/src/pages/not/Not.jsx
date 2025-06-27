import style from "./Not.module.scss"
import { useNavigate } from 'react-router-dom';
import Layout from "../../components/common/layout/Layout"
const Not = () => {
    const navigate = useNavigate();
    const goToHome = () => {
        navigate('/');
    };

    return (
        <Layout>
            <div className={style.not}>
                <p>Page not found</p>
                <div className={style.buttons}>
                    <button onClick={() => navigate(-1)}>Go Back</button>
                    <button onClick={goToHome}>Go to Home</button>
               </div>
          </div>
        </Layout>
    )
}

export default Not
