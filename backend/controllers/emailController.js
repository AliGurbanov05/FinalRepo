import nodemailer from 'nodemailer';

export const sendReceiptEmail = async (req, res) => {
    const { appointment, paymentIntent } = req.body;

    if (!appointment || !paymentIntent) {
        return res.status(400).json({ message: 'Məlumatlar natamamdır' });
    }

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: `"MedOne Clinic" <${process.env.EMAIL_USER}>`,
            to: appointment.email,
            subject: 'Ödəniş Qəbzi',
            html: `
                <h2>Ödəniş Qəbzi</h2>
                <p><strong>Ad:</strong> ${appointment.name} ${appointment.surname}</p>
                <p><strong>Telefon:</strong> ${appointment.phone}</p>
                <p><strong>FIN:</strong> ${appointment.fin}</p>
                <p><strong>Kateqoriya:</strong> ${appointment.category}</p>
                <p><strong>Görüş vaxtı:</strong> ${appointment.date} ${appointment.time}</p>
                <p><strong>Ödəniş məbləği:</strong> ${(paymentIntent.amount / 100).toFixed(2)} AZN</p>
                <p><strong>Status:</strong> ${paymentIntent.status}</p>
            `
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email göndərildi' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Email göndərilərkən xəta baş verdi' });
    }
};
