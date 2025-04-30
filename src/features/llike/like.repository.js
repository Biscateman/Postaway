import mongoose from "mongoose";
import { LikeSchema } from "./like.schema.js";
import { PostSchema } from "../post/post.schema.js";
import { CommentSchema } from "../comment/comment.schema.js";
import { ApplicationError } from "../../middlewares/error.middleware.js";
import { UserSchema } from "../user/user.schema.js";

const likeModel = mongoose.model('Like', LikeSchema);

const postModel = mongoose.model('Post', PostSchema);

const commentModel = mongoose.model('Comment', CommentSchema);

const userModel = mongoose.model('User', UserSchema)

export  class LikeRepository{

    async get(type, id){
        
        try{
            if(type == 'Post'){
                const post =  await postModel.findById(id).populate({
                    path: 'likes',
                    populate: [
                      { path: 'userId' },
                      { path: 'modelId' }
                    ]
                  })
                if(!post || post.likes.length == 0){
                     throw new ApplicationError(404, 'Post not Found')
                }
                return post.likes
             }else{
                const comment = await commentModel.findById(id).populate({
                    path: 'likes',
                    populate: [
                      { path: 'userId' },
                      { path: 'modelId' }
                    ]
                  })
                if(!comment || comment.likes.length == 0){
                    
                    throw new ApplicationError(404, 'Comment not Found')
                }
                return comment.likes
             }
        }catch(error){
            console.log(error)
            throw new ApplicationError(500, error.message)
        }
        
    }


    async toggleLike(type, id, userId){
        try{
            const like = await likeModel.findOne({modelId: id, userId: userId, model: type})
            if(like){
                await likeModel.deleteOne({modelId: new Object(id), userId: new Object(userId) , model: type})

                if(type == 'Post'){
                    const post = await postModel.findById(id)
                    if(!post){
                        return new ApplicationError(404, 'Post not Found')
                    }
                    post.likes = post.likes.filter(like => like.toString() !== like._id.toString())
                    await post.save()
                }else{
                    const comment = await commentModel.findById(id)
                    if(!comment){
                        return new ApplicationError(404, 'Comment not Found')
                    }
                    comment.likes = comment.likes.filter(like => like.toString() !== like._id.toString())
                    await comment.save()
                }

                return {message: 'Like removed'}
            }else{
                const newLike = new likeModel({modelId: new Object(id), userId: new Object(userId), model: type})
                await newLike.save()
                if(type == 'Post'){
                    const post = await postModel.findById(id)
                    if(!post){
                        return new ApplicationError(404, 'Post not Found')
                    }
                    post.likes.push(newLike._id)
                    await post.save()
                }else{
                    const comment = await commentModel.findById(id)
                    if(!comment){
                        return new ApplicationError(404, 'Comment not Found')
                    }
                    comment.likes.push(newLike._id)
                    await comment.save()
                }
                return {message: 'Like added'}
            }
        }catch(error){
            throw new ApplicationError(500, error.message)
        }
    }

}