import User from '../model/userModel.js';
import Appointment from '../model/appointmentModel.js';
import Response from '../model/responseModel.js';

// Xəstə panel üçün user profil və digər məlumatlar
export const getPatientDashboard = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select('name surname phone role');

        if (!user) {
            return res.status(404).json({ message: 'İstifadəçi tapılmadı' });
        }

        const appointments = await Appointment.find({ patientId: userId });

        const responses = await Response.find({ patientId: userId })
            .populate('appointmentId')
            .populate('doctorId', 'name surname');

        // Məsələn, analiz nəticələri statik nümunə kimi
        const analysisResults = [
            { name: 'Qan şəkəri', value: 5.4, unit: 'mmol/L' },
            { name: 'Təzyiq', value: '120/80', unit: 'mmHg' },
            { name: 'Nəbz', value: 75, unit: 'bpm' }
        ];

        return res.status(200).json({
            user: {
                name: user.name,
                surname: user.surname,
                phone: user.phone,
                role: user.role,
            },
            results: analysisResults,
            appointments,
            responses
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Dashboard məlumatları yüklənmədi' });
    }
};

// Profil yeniləmə
export const updatePatientProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const { firstname, lastname, phone } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { name: firstname, surname: lastname, phone },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'İstifadəçi tapılmadı' });
        }

        return res.status(200).json({ message: 'Profil yeniləndi', user: updatedUser });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Profil yenilənərkən xəta baş verdi' });
    }
};

// Hesab silmə
export const deletePatientAccount = async (req, res) => {
    try {
        const userId = req.user.id;
        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({ message: "İstifadəçi tapılmadı" });
        }

        return res.status(200).json({ message: "Hesab uğurla silindi" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Hesab silinərkən xəta baş verdi" });
    }
};

// Xəstənin görüşləri və diaqnozları almaq üçün
export const getPatientAppointmentsWithDiagnosis = async (req, res) => {
    try {
        const patientId = req.user.id;

        const appointments = await Appointment.find({ patientId });

        const responses = await Response.find({ patientId })
            .populate('appointmentId')
            .populate('doctorId', 'name surname');

        res.status(200).json({ appointments, responses });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Görüşlər və diaqnozlar yüklənmədi' });
    }
};
