// controllers/doctorController.js
import Appointment from '../model/appointmentModel.js';
import User from '../model/userModel.js';

export const getDoctorDashboard = async (req, res) => {
    try {
        const doctorId = req.user.id;

        const doctor = await User.findById(doctorId).select('name surname phone fin role category');

        if (!doctor) {
            return res.status(404).json({ message: 'Həkim tapılmadı' });
        }

        const appointments = await Appointment.find({ category: doctor.category });

        res.status(200).json({ doctor, appointments });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const updateDoctorProfile = async (req, res) => {
    try {
        const doctorId = req.user.id;

        const updatedDoctor = await User.findByIdAndUpdate(
            doctorId,
            {
                name: req.body.name,
                surname: req.body.surname,
                phone: req.body.phone,
                fin: req.body.fin,
            },
            { new: true, runValidators: true }
        ).select('name surname phone fin role');

        res.status(200).json(updatedDoctor);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
// Hesab silmək üçün yeni funksiya əlavə edirik
export const deleteDoctorAccount = async (req, res) => {
    try {
        const doctorId = req.user.id;

        // Həkimlə əlaqəli görüşləri də silmək istəsək:
        await Appointment.deleteMany({ doctor: doctorId });

        // Həkim istifadəçisini silmək
        await User.findByIdAndDelete(doctorId);

        res.status(200).json({ message: 'Həkim hesabı uğurla silindi' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getDoctorAppointments = async (req, res) => {
    try {
        // Həkimin tam məlumatlarını götür (kateqoriya üçün)
        const doctor = await User.findById(req.user.id);
        if (!doctor) {
            return res.status(404).json({ message: "Həkim tapılmadı" });
        }

        const doctorCategory = doctor.category; // modelində mütləq category olmalıdır!

        // Kateqoriyaya görə görüşləri gətir
        const appointments = await Appointment.find({ category: doctorCategory, status: 'pending' }).sort({ createdAt: -1 });

        res.status(200).json(appointments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const completeAppointment = async (req, res) => {
    const appointmentId = req.params.id;

    try {
        const appointment = await Appointment.findById(appointmentId);

        if (!appointment) {
            return res.status(404).json({ message: 'Görüş tapılmadı' });
        }

        appointment.status = 'completed';
        await appointment.save();

        res.status(200).json({ message: 'Görüş tamamlandı', appointment });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};