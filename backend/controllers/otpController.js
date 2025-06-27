import twilio from 'twilio';
import dotenv from "dotenv"

dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const verifySid = process.env.TWILIO_VERIFY_SID;

const client = twilio(accountSid, authToken);

// 📤 OTP göndər
export const sendOTP = async (req, res) => {
    const { phone } = req.body;
    console.log('Gələn nömrə:', phone);
    console.log('TWILIO_ACCOUNT_SID:', accountSid);
    console.log('TWILIO_VERIFY_SID:', verifySid);
    
    try {
        const verification = await client.verify.v2.services(verifySid)
            .verifications
            .create({ to: phone, channel: 'sms' });

        res.status(200).json({ message: 'Kod göndərildi', sid: verification.sid });
    } catch (error) {
        console.error('OTP göndərmə xətası:', error.response?.data || error.message);
        res.status(500).json({ message: 'OTP göndərilmədi', error: error.response?.data || error.message });
    }
    
};

// ✅ OTP yoxla
export const verifyOTP = async (req, res) => {
    const { phone, code } = req.body;

    try {
        const verification_check = await client.verify.v2.services(verifySid)
            .verificationChecks
            .create({ to: phone, code });

        if (verification_check.status === "approved") {
            res.status(200).json({ message: "Kod təsdiqləndi ✅" });
        } else {
            res.status(400).json({ message: "Kod yalnışdır ❌" });
        }
    } catch (error) {
        res.status(500).json({ message: 'Yoxlama zamanı xəta baş verdi', error: error.message });
    }
};
