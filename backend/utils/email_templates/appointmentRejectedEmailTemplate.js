const appointmentRejectedEmailTemplate = (
  userName,
  requestedDate,
  requestedTime
) => `
  <!DOCTYPE html>
  <html>
  <head>
    <title>Appointment Rejected</title>
    <style>
      body { font-family: Arial, sans-serif; }
      .container { padding: 20px; }
      .rejected { color: #FF0000; }
    </style>
  </head>
  <body>
    <div class="container">
      <h1 class="rejected">Appointment Rejected</h1>
      <p>Hello ${userName},</p>
      <p>We are writing to inform you that the requested appointment for:</p>
      <p>Date: ${requestedDate}</p>
      <p>Time: ${requestedTime}</p>
      <p>is unavailable.</p>
      <p>We apologize for any inconvenience this may cause.</p>
      <br />
      <p>Warm regards,</p>
      <p>Team Service and Repair</p>
    </div>
  </body>
  </html>
  `;

module.exports = appointmentRejectedEmailTemplate;
