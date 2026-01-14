const nodemailer = require("nodemailer");

const sendEmail = async (name, email, message) => {
  // Create Nodemailer transporter
 const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER, 
    replyTo: email, 
    subject: `New message from ${name}`,
    text: `You received a new message from your website contact form.\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
  };

  // Send mail and return the promise
  return transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
