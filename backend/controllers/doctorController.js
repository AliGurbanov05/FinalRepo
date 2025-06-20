// controllers/doctorController.js
import Appointment from '../model/appointmentModel.js';
import User from '../model/userModel.js';

export const getDoctorDashboard = async (req, res) => {
    try {
        const doctorId = req.user.id;
        const doctor = await User.findById(req.user.id).select('name surname phone role category');
        const doctorCategory = doctor.toObject().category;

        console.log('Həkimin category:', doctorCategory);


        if (!doctor) {
            return res.status(404).json({ message: 'Həkim tapılmadı' });
        }

        const appointments = await Appointment.find({ category: doctorCategory })
            .populate('patientId', 'name surname phone');
        console.log('Həkim:', doctor);
        console.log('Həkimin category:', doctor.category);


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
        const doctor = await User.findById(req.user.id);
        const doctorCategory = doctor.toObject().category;

        const appointments = await Appointment.find({ category: doctorCategory, status: 'pending' })
            .sort({ createdAt: -1 })
            .populate('patientId', 'name surname phone'); // burda da xəstəni əlavə et
        console.log('name,surname,phone');


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

export const deleteAppointment = async (req, res) => {
    try {
        const appointmentId = req.params.id;
        const appointment = await Appointment.findByIdAndDelete(appointmentId);

        if (!appointment) {
            return res.status(404).json({ message: 'Görüş tapılmadı' });
        }

        res.status(200).json({ message: 'Görüş uğurla silindi' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};