// src/components/Testimonials/VideoCard.jsx
import styles from '../../../testimonials/Testimonials.module.scss';

const VideoCard = ({ testimonial }) => {
    return (
        <div className={styles.videoCard}>
            <video
                className={styles.video}
                autoPlay
                loop
                muted
                playsInline
            >
                <source src={testimonial.videoUrl} type="video/mp4" />
            </video>
            <div className={styles.quote}>
                <p>"{testimonial.quote}"</p>
                <span className={styles.author}>{testimonial.name}, {testimonial.role}</span>
            </div>
        </div>
    );
};

export default VideoCard;