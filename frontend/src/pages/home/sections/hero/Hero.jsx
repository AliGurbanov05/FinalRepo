import style from "./hero.module.scss"
import { useNavigate } from "react-router-dom";
const Hero = () => {
    const navigate = useNavigate();
    const goToAppointment = () => {
        navigate('/appointment');
    };
    
    return (
        <div className={style.hero}>
            <div className={style.container}>
                <div className={style.header}>
                    <div className={style.line}></div>
                    <p>Commited to Success</p>
                </div>
                <h1>We care about your health</h1>
                <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis sit quas voluptatum eum consequuntur a eos, facilis assumenda cum amet praesentium neque ullam illo ea nisi iusto sunt architecto reprehenderit!</span>
                <button onClick={goToAppointment}>Appointment &rarr;</button>
            </div>
        </div>
    )
}

export default Hero
