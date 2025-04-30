import mongoose from 'mongoose';
import { OtpSchema } from './otp.schema.js';

const otpModel = new mongoose.model('Otp', OtpSchema)


export class OtpRespository{

    generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

    async createOtpToken(email) {
        const otp = this.generateOTP();
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 mins
        const token = await otpModel.create({ email, otp, expiresAt });
        return { otp, token };
    }
    async verifyOtp(email, otp) {
        const record = await otpModel.findOne({ email, otp });
        if (!record || record.expiresAt < new Date()) return false;
        await otpModel.deleteMany({ email }); 
        return true;
    }

}
