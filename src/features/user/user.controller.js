import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { UserRepository } from './user.repository.js'
import { ApplicationError } from '../../middlewares/error.middleware.js'

export class UserController {
    constructor(){
        this.userRepository = new UserRepository()
    }
    
    async signup(req, res){

        const {name, email, password} = req.body
        const hashedPassword = await bcrypt.hash(password, 12)

        const result =  await this.userRepository.createUser({name,email,password : hashedPassword})
        if(!result){
            return res.status(400).send({success: false, message: 'User already exists'})
        }else{
            return  res.status(201).send({success: true, message: result})
        } 

    }

    async signin(req, res){
        const {email, password} = req.body
        const user = await this.userRepository.findUserByEmail(email)
        if(!user){
            return res.status(401).send({success: false, message: 'Invalid Credentials'})
        }
        try{
            const result = await bcrypt.compare(password, user.password)
        if(result){
            const token = jwt.sign({
                userID: user._id,
                email: user.email
            }, process.env.JWT_SECRET , {expiresIn: '1h'})
            
            res.cookie('jwtToken',token,{maxAge: 60*60*1000})

            res.status(200).send({success: true, message: 'Login successful!'})
        }else{
            res.status(401).send({success: false, message: 'Invalid Credentials'})
        }
        }catch(error){
            console.log(error)
            throw new ApplicationError(500, error.message)
        }
    }

    async signout(req, res){

        res.clearCookie('jwtToken')
        res.status(200).send({success: true, message: 'Logout successful!'})
    }

    async getUserDetails(req, res){
        const {userId} = req.params
        const user = await this.userRepository.findUserById(userId)
        if(!user){
            return res.status(404).send({success: false, message: 'User not found'})
        }else{
            return res.status(200).send({success: true, message: user})
        }
    }

    async getAllUserDetails(req, res){
        const users = await this.userRepository.findAllUsers()
        if(!users){
            return res.status(404).send({success: false, message: 'No users found'})
        }else{
            return res.status(200).send({success: true, message: users})
        }
    }

    async updateUserDetails(req, res){
        const {userId} = req.params
        const userID = req.userID
        if(userId !== userID){
            return res.status(401).send({success: false, message: 'Unauthorized'})
        }
        const {name, email, password} = req.body
        const hashedPassword = await bcrypt.hash(password, 12)

        const user = await this.userRepository.findUserById(userId)
        if(!user){
            return res.status(404).send({success: false, message: 'User not found'})
        }else{
            const updatedUser = await this.userRepository.updateUserById(userId, {name,email,password : hashedPassword})
            return res.status(200).send({success: true, message: updatedUser})
        }
    }
    
}