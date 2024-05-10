const nodeMail = require("nodemailer");

const SendEmail = async (email, subject, text) => {
  console.log(email, subject, text);
  try {
    const transporter = nodeMail.createTransport({
      service: "gmail",
      auth: {
        user: "itpproject2080@gmail.com",
        pass: "jzzj axtm scvx sjri",
      },
    });

    await transporter.sendMail({
      from: "itpproject2080@gmail.com",
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
