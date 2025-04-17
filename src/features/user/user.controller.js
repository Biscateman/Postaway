import { UserModel } from "./user.model.js";
import jwt from 'jsonwebtoken'

export class UserController {
    signup(req, res){

        const {name, email, password} = req.body
        const result = UserModel.add({name,email,password})
        res.status(201).send({success: true, message: 'User has been registered!'})

    }

    signin(req, res){
        const {email, password} = req.body
        const result = UserModel.confirmLogin(email, password)
        if(result){
            const token = jwt.sign({
                userID: result.id,
                email: result.email
            }, 'OKp0YltB8nrJnD5J6B3ks5n5t89vdJcA' , {expiresIn: '1h'})
            
            res.cookie('jwtToken',token,{maxAge: 60*60*1000})

            res.status(200).send({success: true, message: 'Login successful!'})
        }else{
            res.status(401).send({success: false, message: 'Invalid Credentials'})
        }
    }

}