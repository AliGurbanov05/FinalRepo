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
    const { category, date, time } = req.body;
    const userId = req.user?.id;

    try {
        const user = await User.findById(userId).select('name surname phone fin').lean();

        console.log("User document:", user);
        console.log("User fields:", {
            name: user?.name,
            surname: user?.surname,
            phone: user?.phone,
            fin: user?.fin,
        });

        if (!user) {
            return res.status(404).json({ message: 'İstifadəçi tapılmadı' });
        }

        const newAppointment = new Appointment({
            patientId: userId,
            name: user.name,
            surname: user.surname,
            phone: user.phone,
            fin: user.fin,
            category,
            date,
            time,
        });

        console.log("Appointment save üçün hazırlanan data:", newAppointment);

        await newAppointment.save();

        res.status(201).json({ message: 'Görüş yaradıldı', appointment: newAppointment });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server xətası' });
    }
};
