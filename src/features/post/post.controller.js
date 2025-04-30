import { ApplicationError } from "../../middlewares/error.middleware.js";
import { UserRepository } from "../user/user.repository.js";
import { PostRepository } from "./post.repository.js";

export class PostController {
    constructor(){
        this.postRepository = new PostRepository()
        this.userRepository = new UserRepository()
    }

    async getAllPosts(req, res){
        
        
        const posts = await this.postRepository.get()    
        if(posts.length > 0){
            res.status(200).send(posts)
        }
        else{
            return res.status(404).send({success: false, message: 'No posts found'})
        }
        
        
    }

    async getPost(req, res, next){
        const postID = req.params.postId
        const post = await this.postRepository.getByID(postID)
        if(!post){
            next(new ApplicationError(404, 'Post not found'))
        }else{
            res.status(200).send(post)
        }
    }

    async createPost(req, res, next){
        const userID = req.userID
        if(!req.file){
            return res.status(400).send({success: false, message: 'Image is required'})
        }
        let postData = req.body
        postData.imageUrl = '/public/uploads' + req.file.filename
        postData  = {...postData, userID}
        try{
            const result = await this.postRepository.add(postData)
            res.status(201).send(result)
        }
        catch(error){
            next(new ApplicationError(400, error.message))
        }
    }

    async getPostsByUserId(req, res, next){
        const userID = req.params.userId

        const user = await this.userRepository.findUserById(userID)
        if(!user){
            next(new ApplicationError(404, 'User not found'))
        }else{
            const posts = await this.postRepository.getByUserID(userID)
            if(!posts){
                next(new ApplicationError(404, 'Posts not found'))
            }else{
                res.status(200).send(posts)
            }
        }   
    }

    async deletePost(req, res, next){
        const postID = req.params.postId
        const result = await this.postRepository.delete(postID)
        if(!result){
            next(new ApplicationError(400, 'Post not found'))
        }else{
            res.status(200).send('Post Deleted!')
        }
    }

    async updatePost(req, res){
        const postID = req.params.postId

        try{
            const result = await this.postRepository.update(postID, {caption: req.body?req.body.caption:null, imageUrl:req.file?req.file.filename:null})

            if(result.success === false){
                return res.status(400).send(result.message)
            }

            return res.status(200).send(result.res)

        }catch(error){
            return res.status(error.code).send(error.message)
        }
        
    }
}