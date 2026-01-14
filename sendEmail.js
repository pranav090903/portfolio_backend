// const nodemailer = require("nodemailer");

// const sendEmail = async (name, email, message) => {
//   // Create Nodemailer transporter
//  const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 465,
//   secure: true,
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS
//   }
// });
//   const mailOptions = {
//     from: process.env.EMAIL_USER,
//     to: process.env.EMAIL_USER, 
//     replyTo: email, 
//     subject: `New message from ${name}`,
//     text: `You received a new message from your website contact form.\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
//   };

//   // Send mail and return the promise
//   return transporter.sendMail(mailOptions);
// };

// module.exports = sendEmail;

const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (name, email, message) => {
  await resend.emails.send({
    from: "Portfolio Contact Form <onboarding@resend.dev>",
    to: process.env.RECEIVER_EMAIL,
    reply_to: email,
    subject: `New message from ${name}`,
    text: `
      Name: ${name}
      Email: ${email}
      
      Message:
      ${message}
    `
  });
};

module.exports = sendEmail;
