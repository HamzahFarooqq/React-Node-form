import nodemailer from 'nodemailer';


    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'hamzafarooq.18mmes2.338@gmail.com',
            pass: 'lvqmodyoezoituvz'
        }
    })

export async function sendResetEmail(to, resetToken){

    const resetLink = `https://localhost:5173/reset-password?token=${resetToken}`;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject: 'Password Reset Request',
        html: `
            <p>You requested a password reset.</p>
            <p>Click below to reset your password. The link is valid for 10 minutes:</p>
            <a href="${resetLink}">${resetLink}</a>
        `,
    }

    try{
        await transporter.sendMail(mailOptions);
    } catch (error) {  
        console.log(error);
        throw new Error('Failed to send reset email');
    }

}