const { createMailTransport } = require("./CreateMailTransport");

const sendVerificationMail = (user) => {
    const transporter = createMailTransport();

    const mailOptions = {
        from: '"Holihub" <diacksidibe500@gmail.com>',
        to: user.email,
        subject: "verify your email...",
        html: `<p> Hello ${user.nom}, verifié votre email by clicking this link... </p>
        <a href='http://localhost:3000/${user.role}/verify-email?emailToken=${user.emailToken}'>
         verify your Email </a>`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log("verification email sent");
        }
    });
};
module.exports = sendVerificationMail; 