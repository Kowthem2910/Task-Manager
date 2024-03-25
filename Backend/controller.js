const nodemailer = require("nodemailer");
const path = require("path");
var html = require("nodemailer-express-handlebars");

function getTemplateName(type, content) {
  switch (type){
    case "login":
      return {
        template:'login',
        context:{
          from:content.from,
          to:content.to,
          subject:content.subject,
          body:content.body,
        }
      };
    case 'assign_task':
      return {
        template:'AssignTask',
        context:{
          from:content.fromName,
          to:content.toName,
          text:content.task,
          dueDate:content.dueDate,
        }
      };
    case 'update_task':
      return {
        template:'UpdateTask',
        context:{
          from:content.fromName,
          to:content.toName,
          text:content.task,
          subject:"Task Status Updated",
          status:content.status,
          dueDate:content.dueDate,
        }
      };
  }
}

const mail = async (req, res) => {
  const { to, subject, from } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "vsbec2002@gmail.com",
      pass: "qpko rhwp ymvp molp",
    },
  });

  const handlebarOptions = {
    viewEngine: {
      extName: ".html",
      partialsDir: path.resolve("./views"),
      defaultLayout: false,
    },
    viewPath: path.resolve("./views"),
    extName: ".html",
  };

  transporter.use("compile", html(handlebarOptions));

  const template = getTemplateName(req.body.type, req.body);


  const message = {
    from: from,
    to: to,
    subject: subject,
    template: template.template,
    context:template.context,
  };

  try {
    const info = await transporter.sendMail(message);
    console.log("Message sent: %s", info.messageId);
    res.status(200).json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ success: false, message: "Error sending email" });
  }
};

module.exports = {
  mail,
};
