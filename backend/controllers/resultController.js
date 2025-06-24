// controllers/responseController.js
import Response from '../model/resultModel.js';
import Appointment from '../model/appointmentModel.js';

export const createResponse = async (req, res) => {
    try {
        const appointmentId = req.params.id;
        const doctorId = req.user.id;
        const { diagnosis } = req.body;

        if (!diagnosis) {
            return res.status(400).json({ message: 'Diaqnoz daxil edilməyib' });
        }

        const appointment = await Appointment.findById(appointmentId);
        if (!appointment) {
            return res.status(404).json({ message: 'Görüş tapılmadı' });
        }

        const response = new Response({
            appointmentId,
            doctorId,
            patientId: appointment.patientId,
            result: diagnosis,
        });

        await response.save();

        appointment.status = 'deactive';
        await appointment.save();

        res.status(200).json({ message: 'Diaqnoz əlavə edildi və görüş tamamlandı', response });
    } catch (error) {
        console.error('createResponse error:', error);
        res.status(500).json({ message: error.message });
    }
};

export const getResponseByAppointmentId = async (req, res) => {
    try {
        const response = await Response.findOne({ appointmentId: req.params.id }).populate('doctorId', 'name surname');
        if (!response) return res.status(404).json({ message: 'Cavab tapılmadı' });

        res.status(200).json(response);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
