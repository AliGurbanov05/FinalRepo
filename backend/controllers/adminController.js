import User from "../model/userModel.js";
import Appointment from "../model/appointmentModel.js";

// Bütün istifadəçilər (şifrə olmadan)
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");

        if (!users || users.length === 0) {
            return res.status(404).json({ message: "İstifadəçi tapılmadı" });
        }

        res.status(200).json(users);
    } catch (error) {
        console.error("getAllUsers ERROR:", error);
        res.status(500).json({ message: "Server xətası baş verdi" });
    }
};

// İstifadəçini yenilə
export const updateUser = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        const user = await User.findByIdAndUpdate(id, updates, { new: true }).select("-password");
        if (!user) return res.status(404).json({ message: "İstifadəçi tapılmadı" });

        res.json(user);
    } catch (error) {
        console.error("updateUser ERROR:", error);
        res.status(500).json({ message: "Server xətası baş verdi" });
    }
};

// Bütün görüşlər
export const getAllAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find()
            .populate("patientId", "name surname email fin phone"); // düz path budur

        res.json(appointments);
    } catch (error) {
        console.error("getAllAppointments ERROR:", error);
        res.status(500).json({ message: "Server xətası baş verdi" });
    }
};

// Görüş statusunu yenilə
export const updateAppointmentStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ["active", "deactive"];
    if (!validStatuses.includes(status)) {
        return res.status(400).json({ message: "Status düzgün deyil" });
    }

    try {
        const appointment = await Appointment.findByIdAndUpdate(id, { status }, { new: true });
        if (!appointment) return res.status(404).json({ message: "Görüş tapılmadı" });

        res.json(appointment);
    } catch (error) {
        console.error("updateAppointmentStatus ERROR:", error);
        res.status(500).json({ message: "Server xətası baş verdi" });
    }
};

export const deleteAppointment = async (req, res) => {
    const { id } = req.params;

    try {
        const deleted = await Appointment.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({ message: "Görüş tapılmadı" });
        }

        res.json({ message: "Görüş uğurla silindi" });
    } catch (error) {
        console.error("deleteAppointment ERROR:", error);
        res.status(500).json({ message: "Silinərkən server xətası baş verdi" });
    }
};

// İstifadəçini sil
export const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: "İstifadəçi tapılmadı" });
        }

        res.status(200).json({ message: "İstifadəçi silindi" });
    } catch (error) {
        console.error("deleteUser ERROR:", error);
        res.status(500).json({ message: "Server xətası baş verdi" });
    }
};
