const nodemailer = require("nodemailer");


const createMailTransport=()=>{
    const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            // TODO: replace `user` and `pass` values from <https://forwardemail.net>
            user: "diacksidibe500@gmail.com",
            pass: "tfhs oynr pozl ylbt",
        },
        });
    return transporter;
}
module.exports={createMailTransport};