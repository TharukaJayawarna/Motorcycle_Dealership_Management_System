const timeNotAvailableEmailTemplate = (
  userName,
  requestedDate,
  requestedTime,
  rescheduledDate,
  rescheduledTime
) => `
<!DOCTYPE html>
<html>
<head>
    <title>Appointment Rescheduling Needed</title>
    <style>
        body { font-family: Arial, sans-serif; }
        .container { padding: 20px; }
        .reschedule { color: #FFA07A; }
    </style>
</head>
<body>
    <div class="container">
        <h1 class="reschedule">Appointment Rescheduling Required</h1>
        <p>Hello ${userName},</p>
        <p>We regret to inform you that the requested appointment time is no longer available.</p>
        <p>Requested Appointment Details:</p>
        <p>Date: ${requestedDate}</p>
        <p>Time: ${requestedTime}</p>
        <p>However, we are eager to accommodate you and have the following time slots available:</p>
        <p>Date: ${rescheduledDate}</p>
        <p>Time: ${rescheduledTime}</p>
        <p>Please let us know your preferred time slot by replying to this email.</p>
        <p>We apologize for any inconvenience and thank you for your understanding.</p>
        <br />
        <p>Warm regards,</p>
        <p>Team Service and Repair</p>
    </div>
</body>
</html>
`;

module.exports = timeNotAvailableEmailTemplate;
