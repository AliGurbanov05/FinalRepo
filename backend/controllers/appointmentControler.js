import Appointment from '../model/appointmentModel.js';
import User from '../model/userModel.js';
export const getAppointmentsByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const appointments = await Appointment.find({ category });
        res.status(200).json(appointments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getAppointmentsByPhone = async (req, res) => {
    try {
        const { phone } = req.params;
        const appointments = await Appointment.find({ phone });
        res.status(200).json(appointments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const createAppointment = async (req, res) => {
    const { category, date, time, doctorId } = req.body;  // doctorId də əlavə olundu
    const userId = req.user?.id;

    try {
        const user = await User.findById(userId).select('name surname email phone fin').lean();

        if (!user) {
            return res.status(404).json({ message: 'İstifadəçi tapılmadı' });
        }

        const newAppointment = new Appointment({
            patientId: userId,
            doctorId,   // burada əlavə olunur
            name: user.name,
            surname: user.surname,
            phone: user.phone,
            fin: user.fin,
            email: user.email,
            category,
            date,
            time,
        });

        await newAppointment.save();

        res.status(201).json({ message: 'Görüş yaradıldı', appointment: newAppointment });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server xətası' });
    }
};
;
