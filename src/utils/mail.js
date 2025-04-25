import Mailgen from "mailgen";
import nodemailer from "nodemailer"

const sendMail = async(options)=>{

    const  mailGenerator = new Mailgen({
        theme: 'default',
        product: {
            name: 'Task Manager ',
            link: 'https://mailgen.js/',
        }
    });
    var emailText = mailGenerator.generatePlaintext(options.mailGenContent)
    var emailHtml = mailGenerator.generate(options.mailGenContent)

    const transporter = nodemailer.createTransport({
        host:process.env.MAILTRAP_SMTP_HOST,
        port: 587,
        secure: false, // true for port 465, false for other ports
        auth: {
          user: process.env.MAILTRAP_SMTP_USER,
          pass: process.env.MAILTRAP_SMTP_PASS,
        },
      });


      const mail ={
        from: "mail.taskmanager@example.com",
        to: options.email,
        subject:options.emailText, // plain text
        html:options.emailHtml, // html body
      };

      try {
        await transporter.sendMail(mail)
      } catch (error) {
        console.error("error emailed failed ");
        
      }
    
    
}

const emailVerificationMailGenContent = (username, verificationUrl) =>{
    return {
        body: {
            name: username,
            intro:" Welcome to App! We're very excited to have you on board",
            action: {
                instruction : "To get started with out App, Please click here:",
                buttion: {
                    color: "#22BC66",
                    text:"Verify your email",
                    link: verificationUrl,
                }
            },
             outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
        }
    }
}
const forgotPasswordMailGenContent = (username, passwordResetUrl) =>{
    return {
        body: {
            name: username,
            intro:" We got a request to reset your password",
            action: {
                instruction : "To change your password click the button",
                buttion: {
                    color: "#22BC66",
                    text:"reset password",
                    link: passwordResetUrl,
                }
            },
             outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
        }
    }
}
    
export {sendMail, emailVerificationMailGenContent, forgotPasswordMailGenContent}