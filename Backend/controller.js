const nodemailer = require("nodemailer");

const mail = async (req, res) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "wwwkowthem073@gmail.com",
      pass: "awnu tqso gtuh bttd",
    },
  });

  const message = {
    from: 'wwwkowthem073@gmail.com', 
    to: "",
    subject: "Task Assigned",
    text: "Hello world?", 
    html: "<b>Hello world?</b>", 
  }

  try {
      const info = await transporter.sendMail(message);
      console.log("Message sent: %s", info.messageId);
    } catch (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ success: false, message: 'Error sending verification email' });
    }
  //res.status(201).json("success");
};

module.exports = {
  mail,
};
