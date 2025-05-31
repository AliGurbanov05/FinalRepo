import React from 'react'
import a from "../../../../images/1.png"
import b from "../../../../images/2.png"
import style from "./About.module.scss"
const About = () => {
    return (
        <div className={style.about}>
            <div className={style.container}>
                <div className={style.txt}>
                    <div className={style.header}>
                        <div className={style.line}></div>
                        <p>About Our Company</p>
                    </div>
                    <h1>Welcome To Our Hospital</h1>
                    <span>There arge many variations ohf pacgssages of sorem gpsum ilable, but the majority have suffered alteration in some form, by ected humour, or randomised words whi.</span>
                    <button>Find Doctors</button>
                </div>
                <div className={style.image}>
                    <img className={style.man} src={a} alt="" />
                    <div className={style.woman}>
                        <img src={b} alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About
