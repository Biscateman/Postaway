import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail', // or your provider
  auth: {
    user: `${process.env.EMAIL_USER}`, // your email address
    pass: `${process.env.EMAIL_PASS}`
  }
});

export const sendOtpMail = async (email, otp) => {
  const info = await transporter.sendMail({
    from: `"Postaway" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Your OTP Code',
    html: `<p>Your OTP is <b>${otp}</b>. It expires in 10 minutes.</p>`
  });

  return info;
};

