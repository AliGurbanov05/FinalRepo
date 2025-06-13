export const getPatientDashboard = async (req, res) => {
    try {
        // Burada req.user-dan istifadə edə bilərik (token decoded)
        const userId = req.user.id;

        // Demo data, realdə DB-dən çəkilməlidir
        const user = {
            username: 'patient123',
            role: 'patient'
        };

        const analysisResults = [
            { name: 'Qan şəkəri', value: 5.4, unit: 'mmol/L' },
            { name: 'Təzyiq', value: '120/80', unit: 'mmHg' },
            { name: 'Nəbz', value: 75, unit: 'bpm' }
        ];

        return res.status(200).json({ user, results: analysisResults });
    } catch (error) {
        return res.status(500).json({ message: 'Dashboard məlumatları yüklənmədi' });
    }
};
  