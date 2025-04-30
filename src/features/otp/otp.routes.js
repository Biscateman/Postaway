import express from 'express';
import jwtAuth from '../../middlewares/jwt.middleware.js';
import { OtpController } from './otp.controller.js';


const router = express.Router();

const controller = new OtpController();

router.use(jwtAuth)

router.post('/send', (req, res, next) => {
    controller.sendOtp(req, res, next)
});
router.post('/verify', (req, res, next) => {
    controller.verifyOtp(req, res, next)
});
router.post('/reset-password', (req, res, next) => {
    controller.resetPassword(req, res, next)
});


export default router