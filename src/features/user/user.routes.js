import express from 'express'
import { UserController } from "./user.controller.js"
import jwtAuth from '../../middlewares/jwt.middleware.js'

const router = express.Router()
const userController = new UserController()

router.post('/signup', (req, res, next) => {
    userController.signup(req, res,next)
})
router.post('/signin', (req,res,next)=>{
    userController.signin(req, res, next)
})

router.get('/logout', jwtAuth, (req, res,next) => {
    userController.signout(req, res, next)
})

router.get('/get-details/:userId', jwtAuth, (req, res, next) => {
    userController.getUserDetails(req, res, next)
})

router.get('/get-all-details', (req, res, next) => {
    userController.getAllUserDetails(req, res, next)
})

router.put('/update-details/:userId', jwtAuth, (req, res, next) => {
    userController.updateUserDetails(req, res, next)
})

export default router