const nodeMail = require("nodemailer");

const SendEmail = async (email, subject, text) => {
  try {
    const transporter = nodeMail.createTransport({
      host: process.env.HOST,
      service: process.env.SERVICE,
      port: Number(process.env.EMAIL_PORT),
      secure: Boolean(process.env.SECURE),
      auth: {
        user: "isharamadusanka0714@gmail.com",
        pass: "oddlakwxossufvui",
      },
    });

    await transporter.sendMail({
      from: process.env.USER,
      to: email,
      subject: subject,
      text: text,
    });
    console.log("Email Sent Successfully");
  } catch (error) {
    console.log("Email Not Sent");
    console.log(error);
  }
};

module.exports = SendEmail;
