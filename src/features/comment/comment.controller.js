import { ApplicationError } from "../../middlewares/error.middleware.js"
import { PostRepository } from "../post/post.repository.js"
import { CommentRepository } from "./comment.repository.js"

export class CommentController {

    constructor() {
        this.commentRepository = new CommentRepository()
        this.postRepository = new PostRepository()
    }

    async getComments(req, res, next) {
        const postID = req.params.postId
        const post = await this.postRepository.getByID(postID)
        if(!post){
            return next(new ApplicationError(404, 'Post not found'))
        }

        const comments = await this.commentRepository.getByPostID(postID)

        if(comments.length == 0){
            return next(new ApplicationError(404, 'Comments not found'))    
            
        }else{
            return res.status(200).send(comments)
        }
    }

    async postComment(req, res, next) {
        const postID = req.params.postId
        const userID = req.userID
        const comment = req.body.comment

        const post = this.postRepository.getByID(postID)
        if(!post){
            return next(new ApplicationError(404, 'Post not found'))
        }
        try {
            const result = await this.commentRepository.add({userID, postID, comment})
            res.status(201).send(result)
        }
        catch (error) {
            return next(new ApplicationError(error.code, error.message))
        }

    }

    async deleteComment(req, res,next){
        const id =  req.params.commentId
        try{
            
        const result = await this.commentRepository.delete(id)
        if(!result){
            return res.status(404).send('Comment not found')
        }
        return res.status(200).send('Comment deleted successfully')
        }catch(err){
            next( new ApplicationError(err.code, err.message))
        }
    }

    async updateComment(req, res, next){
        const id = req.params.commentId
        const comment = req.body.comment
        try{
            const result = await this.commentRepository.update(id, comment)
            if(!result){
                return res.status(404).send('Comment not found')
            }
            return res.status(200).send('Comment updated successfully')
        }catch(err){
            next( new ApplicationError(err.code, err.message))
        }

    }

}