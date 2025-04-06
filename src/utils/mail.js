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
    