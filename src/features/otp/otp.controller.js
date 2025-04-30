import { sendOtpMail } from '../../middlewares/mailer.middleware.js';
import { UserSchema } from '../user/user.schema.js';
import { OtpRespository } from './otp.repository.js';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userModel = mongoose.model('User', UserSchema);


export class OtpController{
    constructor(){
        this.repo = new OtpRespository();
    }

    async sendOtp(req, res) {
        const userID = req.userID;
        const user = await userModel.findById(userID);
        if (!user) return res.status(404).json({ message: 'User not found' });

        const { otp } = await this.repo.createOtpToken(user.email);
        await sendOtpMail(user.email, otp);
        res.send({ message: 'OTP sent to email' });
    }

    async verifyOtp(req, res) {
        const userID = req.userID;
        const user = await userModel.findById(userID);
        
        const email = user.email;

        const {otp } = req.body;
        const isValid = await this.repo.verifyOtp(email, otp);
        if (!isValid) return res.status(400).json({ message: 'Invalid or expired OTP' });
        res.send({ message: 'OTP verified' });
    }

    async resetPassword(req, res) {
        const { newPassword } = req.body;

        const userID = req.userID;
        const user = await userModel.findById(userID);
        const email = user.email;

        const hashedPassword = await bcrypt.hash(newPassword, 12);
        await userModel.findOneAndUpdate({ email }, { password: hashedPassword });

        res.send({ message: 'Password reset successfully' });
    }
}
