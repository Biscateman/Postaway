import { PostModel } from "./post.model.js";
import { ApplicationError } from "../../middlewares/error.middleware.js";

export class PostController {

    getPosts(req, res){
        
        const userID = req.userID
        const posts = PostModel.get(userID)
            
        if(posts.length > 0){
            res.status(200).send(posts)
        }else{
            throw new ApplicationError('Post not found',400)
        }
    }

    getPost(req, res){
        const postID = req.params.id
        const post = PostModel.getByID(postID)
        if(!post){
            throw new ApplicationError('Post not found',400)
        }else{
            res.status(200).send(post)
        }
    }

    createPost(req, res){
        const userID = req.userID
        if(!req.file){
            console.log('no file uploaded')
        }
        const caption = req.body.caption
        const imageUrl = '/public/uploads' + req.file.filename
        const result = PostModel.add(userID, caption, imageUrl)
        res.status(201).send(result)
    }

    deletePost(req, res){
        const postID = req.params.id
        const result = PostModel.delete(postID)
        if(!result){
            throw new ApplicationError('Post not found',400)
        }else{
            res.status(200).send('Post Deleted!')
        }
    }

    updatePost(req, res){
        const postID = req.params.id
        const {caption} = req.body
        let imageUrl =  ''
        if (req.file){
            imageUrl = '/public/uploads/' + req.file.filename
        }
        const result = PostModel.update(postID, caption, imageUrl)

        if(!result){
            throw new ApplicationError('Post not found',400)
        }else{
            res.status(200).send(result)
        }
    }
}