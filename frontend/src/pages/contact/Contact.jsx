import style from "./Contact.module.scss"
import Layout from '../../components/common/layout/Layout'

const Contact = () => {
    return (
        <Layout>
            <div className={style.contact} style={{ marginTop: '2rem' }}>
                <div style={{ borderRadius: '10px', overflow: 'hidden', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3037.3177527072484!2d49.65218301540349!3d40.59194757934317!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4030910275a3644f%3A0x31c7c823a6c7f8e1!2sSumqayit%20State%20University!5e0!3m2!1sen!2saz!4v1687428261660!5m2!1sen!2saz"
                        width="100%"
                        height="300"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        className={style.map}
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Xəstəxana xəritəsi"
                    ></iframe>
                </div>
            </div>
        </Layout>
    )
}

export default Contact