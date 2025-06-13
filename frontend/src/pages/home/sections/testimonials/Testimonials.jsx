import React from "react";
import { CgTrees } from "react-icons/cg";
import v1 from "../../../../videos/v1.mp4"
import v2 from "../../../../videos/v2.mp4"
import v3 from "../../../../videos/v3.mp4"
import { MdEnergySavingsLeaf } from "react-icons/md";
import { BsBoxFill } from "react-icons/bs";
import { LuFlower2 } from "react-icons/lu";
import styles from "./Testimonials.module.scss";
import { AiFillThunderbolt } from "react-icons/ai";

const Testimonials = () => {
    return (
        <div className={styles.videoSection}>
            <div className={styles.waveTop} >
                <h2 className={styles.title}>Everything you need, nothing you don’t...</h2>
            </div>
            <div className={styles.features}>
                <span> <BsBoxFill className={styles.icon} /> No Added Sugar</span>
                <span> <AiFillThunderbolt className={styles.icon} />Max Strength</span>
                <span> <CgTrees className={`${styles.icon} ${styles.icon1}`} />No Junk</span>
                <span> <LuFlower2 className={styles.icon} />All-Natural</span>
                <span> <MdEnergySavingsLeaf className={`${styles.icon} ${styles.icon2}`} />100% Vegan</span>
            </div>
            

            <div className={styles.body}>
                <div className={styles.cardContainer}>
                    <div className={`${styles.card} ${styles.card1}`}>
                        <video src={v1} autoPlay loop muted />
                    </div>
                    <div className={`${styles.card} ${styles.card2}`}>
                        <video src={v2} autoPlay loop muted />
                    </div>
                    <div className={`${styles.card} ${styles.card3}`}>
                        <video src={v3} autoPlay loop muted />
                    </div>
                </div>
                <div className={styles.review}>
                    <h3>4.7 stars from 40,000+ happy customers</h3>
                    <p className={styles.stars}>★★★★★</p>
                    <p className={styles.text}>
                        “Truthfully, I feel a lot better and it inspired me to get all my vitamins right! It still amazes me how much of a difference I feel after taking it.”
                    </p>
                    <p className={styles.author}>Sarah, Tonic Health customer</p>
                </div>
            </div>
        </div>

    );
};

export default Testimonials;