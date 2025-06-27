import { useState } from 'react';
import style from "./Services.module.scss"
import { FaTooth } from "react-icons/fa";
import { CiMicrochip } from "react-icons/ci";
import { RiHeartPulseFill } from "react-icons/ri";
import { FaEarListen } from "react-icons/fa6";
import { PiBoneFill } from "react-icons/pi";
import { FaLungs } from "react-icons/fa";
import a from "../../../../images/1.png"
import b from "../../../../images/2.png"
import c from "../../../../images/c.png"
import d from "../../../../images/d.png"
import e from "../../../../images/e.png"
const Services = () => {
    const tabs = [
        {
            title: 'Dentistry',
            icon: <FaTooth className={style.icon} />,
            description: 'Dentist with surgical mask holding scaler near patient.',
            description2: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. ',
            image: d
        },
        {
            title: 'Cardiology',
            icon: <RiHeartPulseFill />,
            description: 'Heart specialist checking ECG of a patient.',
            description2: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. ',
            image: a
        },
        {
            title: 'ENT Specialist',
            icon: <FaEarListen />,
            description: 'Ear specialist examining the patient.',
            description2: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. ',
            image: b
        },
        {
            title: 'Astrology',
            icon: <PiBoneFill />,
            description: 'Astrology',
            description2: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. ',
            image: c
        },
        {
            title: 'Anathomy',
            icon: <FaLungs />,
            description: 'Anathomy',
            description2: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. ',
            image: d
        },
        {
            title: 'Blood',
            icon: <CiMicrochip />,
            description: 'Blood',
            description2: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. ',
            image: e
        },

        // digər department-lər
    ];
    const [activeIndex, setActiveIndex] = useState(0);


    return (
        <div className={style.services}>
            <div className={style.container}>
                <div className={style.header}>
                    <div className={style.lin}>
                        <div className={style.line}></div>
                        <p>Our Departments</p>
                    </div>
                    <h1>Our Medical Services</h1>
                </div>
                <div className={style.tabs}>
                    {tabs.map((tab, index) => (
                        <div
                            key={index}
                            className={`${style.tab} ${index === activeIndex ? style.active : ''}`}
                            onClick={() => setActiveIndex(index)}
                        >
                            <span className={style.icon}>{tab.icon}</span>
                            <span>{tab.title}</span>
                        </div>
                    ))}
                </div>
                <div className={style.content}>
                    <div className={style.text}>
                        <p>{tabs[activeIndex].description}</p>
                        <h2>{tabs[activeIndex].description2}</h2>
                        <button>Appointment &rarr;</button>
                    </div>
                    <div className={style.image}>
                        <img src={tabs[activeIndex].image} alt={tabs[activeIndex].title} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Services
