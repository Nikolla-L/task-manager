const nodemailer = require("nodemailer");
import property from "src/configuration/property";

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: property.MAILER.USER,
        pass: property.MAILER.PASSWORD
    }, 
    tls:{
        rejectUnauthorized:false
    }
});

export const sendConfrimCode = async(email: string, code: string) => {
    try {
        const result = await transporter.sendMail({
            from: '"Code" <n_lukava@cu.edu.ge>',
            to: [email],
            subject: 'task-manager',
            text: `${code} - email confirmation code`
        });
    } catch (error) {
        console.log(error)
    }
}

export const sendRegistrationWelcome = async (email: string) => {
    await transporter.sendMail({
        from: '"Welcome" <n_lukava@cu.edu.ge>',
        to: email,
        subject: "welcome", 
        html: `<h1 style="color: red">გილოცავთ!</h1><br/><p>თქვენ წარმატებით გაიარეთ რეგისტრაცია task-manager სისტემაში</p>`,
    });
}