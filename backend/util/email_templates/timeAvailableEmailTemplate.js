const timeAvailableEmailTemplate = (userName, appointmentDate, appointmentTime) => `
<!DOCTYPE html>
<html>
<head>
    <title>Appointment Confirmation</title>
    <style>
        body { font-family: Arial, sans-serif; }
        .container { padding: 20px; }
        .confirmation { color: #4CAF50; }
    </style>
</head>
<body>
    <div class="container">
        <h1 class="confirmation">Appointment Confirmed!</h1>
        <p>Hello ${userName},</p>
        <p>We are pleased to inform you that your appointment time is available and has been confirmed.</p>
        <p>Appointment Details:</p>
        <p><strong>Date:</strong> ${appointmentDate}</p>
        <p><strong>Time:</strong> ${appointmentTime}</p>
        <p>Please arrive 10 minutes early to complete any necessary paperwork.</p>
        <p>If you have any questions or need to reschedule, please reply to this email or give us a call.</p>
        <br />
        <p>Looking forward to seeing you,</p>
        <p>Team Service and Repair</p>
    </div>
</body>
</html>
`;

module.exports = timeAvailableEmailTemplate;
