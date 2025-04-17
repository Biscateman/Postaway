import { CommentModel } from "./comment.model.js"
import { ApplicationError } from "../../middlewares/error.middleware.js"

export class CommentController {
    getComments(req, res) {
        const postID = req.params.id
        const result = CommentModel.get(postID)
        if(result.length == 0){
            throw new ApplicationError('Comments not found',404)    
            
        }else{
            res.status(200).send(result)
        }
    }

    postComment(req, res) {
        const postID = req.params.id
        const userID = req.userID
        const content = req.body.content
        const result = CommentModel.add(userID, postID, content)
        res.status(201).send('Comment Posted')
    }

    deleteComment(req, res){
        const id =  req.params.id
        const result = CommentModel.delete(id)
        if(!result) {
            throw new ApplicationError('Comment not found',404) 
        }else{
            res.status(200).send('Comment Deleted')
        }
    }

    updateComment(req, res){
        const id = req.params.id
        const content = req.body.content
        const result = CommentModel.update(id, content)

        if(!result){
            throw new ApplicationError('Comment not found',404)    
        }else{
            res.status(200).send(result.content)
        }

    }

}