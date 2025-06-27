import { FaTwitter } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";
import { FaPinterestP } from "react-icons/fa";
import style from "./Specialists.module.scss"
import t1 from "../../../../images/t1.png"
import t2 from "../../../../images/t2.png"
import t3 from "../../../../images/t3.png"
const Specialists = () => {
    return (
        <div className={style.specialists}>
            <div className={style.txt}>
                <div className={style.header}>
                    <div className={style.line}></div>
                    <p>Our Doctors</p>
                </div>
                <h1>Our Specialist</h1>
            </div>
            <div className={style.divs}>
                <div className={style.div}>
                    <img src={t1} alt="" />
                    <p>İlqar Mikayloğlu</p>
                    <span>Endokrinoloq</span>
                    <div className={style.icons}>
                        <FaTwitter className={style.icon} />
                        <TbWorld className={style.icon} />
                        <FaFacebookF className={style.icon} />
                        <FaPinterestP className={style.icon} />
                    </div>
                </div>
                <div className={style.div}>
                    <img src={t2} alt="" />
                    <p>Mətanət İsgəndərli</p>
                    <span>Sosioloq</span>
                    <div className={style.icons}>
                        <FaTwitter className={style.icon} />
                        <TbWorld className={style.icon} />
                        <FaFacebookF className={style.icon} />
                        <FaPinterestP className={style.icon} />
                    </div>
                </div>
                <div className={style.div}>
                    <img src={t3} alt="" />
                    <p>Cahid Şahbazov</p>
                    <span>Oftarmoloq</span>
                    <div className={style.icons}>
                        <FaTwitter className={style.icon} />
                        <TbWorld className={style.icon} />
                        <FaFacebookF className={style.icon} />
                        <FaPinterestP className={style.icon} />
                    </div>
                </div>
                <div className={style.div}>
                    <img src={t3} alt="" />
                    <p>Cahid Şahbazov</p>
                    <span>Oftarmoloq</span>
                    <div className={style.icons}>
                        <FaTwitter className={style.icon} />
                        <TbWorld className={style.icon} />
                        <FaFacebookF className={style.icon} />
                        <FaPinterestP className={style.icon} />
                    </div>
                </div>
                <div className={style.div}>
                    <img src={t3} alt="" />
                    <p>Cahid Şahbazov</p>
                    <span>Oftarmoloq</span>
                    <div className={style.icons}>
                        <FaTwitter className={style.icon} />
                        <TbWorld className={style.icon} />
                        <FaFacebookF className={style.icon} />
                        <FaPinterestP className={style.icon} />
                    </div>
                </div>
                <div className={style.div}>
                    <img src={t3} alt="" />
                    <p>Cahid Şahbazov</p>
                    <span>Oftarmoloq</span>
                    <div className={style.icons}>
                        <FaTwitter className={style.icon} />
                        <TbWorld className={style.icon} />
                        <FaFacebookF className={style.icon} />
                        <FaPinterestP className={style.icon} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Specialists
