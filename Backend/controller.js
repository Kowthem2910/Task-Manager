const nodemailer = require("nodemailer");

const mail = async (req, res) => {
  console.log(req)
  const { to, subject, text} = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "vsbec2002@gmail.com",
      pass: "fscw awmp iija bthb",
    },
  });

  const message = {
    from: 'vsbec2002@gmail.com', 
    to: to,
    subject: subject,
    text: text,
  }

  try {
    const info = await transporter.sendMail(message);
    console.log("Message sent: %s", info.messageId);
    res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, message: 'Error sending email' });
  }
};

module.exports = {
  mail,
};
