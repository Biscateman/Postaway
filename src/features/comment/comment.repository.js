import mongoose from "mongoose"
import { CommentSchema } from "./comment.schema.js"
import { ApplicationError } from "../../middlewares/error.middleware.js"

const commentModel = mongoose.model('Comment', CommentSchema)

export class CommentRepository {
    async getByPostID(postID) {
        try {
            const comments = await commentModel.find({ postID }).populate('userID')
            return comments
        } catch (error) {
            console.log(error)
            return []
        }
    }

    async add(commentDetails) {
        try {
            const comment = new commentModel(commentDetails)
            await comment.save()
            return comment
        } catch (error) {
            throw new ApplicationError(400, 'Comment is required')
        }
    }

    async delete(id){
        try {
            const comment = await commentModel.findByIdAndDelete(id)
            return comment
        } catch (error) {
            throw new ApplicationError(500, 'Error deleting comment')
        }
    }

    async update(id, content){
        try {
            const comment = await commentModel.findById(id)
            comment.comment = content
            await comment.save()
            return comment
        } catch (error) {   
            console.log(error)
            throw new ApplicationError(500, 'Error updating comment')
        }
    }
}