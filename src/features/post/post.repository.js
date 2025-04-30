import { ApplicationError } from "../../middlewares/error.middleware.js"
import { UserSchema } from "../user/user.schema.js"
import { PostSchema } from "./post.schema.js"
import mongoose from "mongoose"

const postModel = mongoose.model('Post', PostSchema)

const userModel = mongoose.model('User', UserSchema)

export  class PostRepository{
    
    async get(){
        try{
            const posts = await postModel.find().populate('userID')
            return posts
        }catch(error){
            throw new ApplicationError(500, error.message)
        }
    }

    async add(postData){
        try{
            const post = new postModel({
                userID: postData.userID,
                caption: postData.caption,
                imageUrl: postData.imageUrl
            })
            await post.save()
            return post
        }catch(error){
            throw new ApplicationError(400, error.message)
        }

    }

    async getByID(postID){
        try{
            const post = await postModel.findById(postID).populate('userID')
            return post
        }catch(error){
            return null
        }
    }

    async getByUserID(userID){
        try{
            const posts = await postModel.find({userID: new Object(userID)}).populate('userID')
            if(posts.length === 0){
                return null
            }
            return posts
        }catch(error){
            return null
        }
    }

    async delete(postID){
        try{
            const post = await postModel.findByIdAndDelete(postID)
            return post
        }catch(error){
            return null
        }
    }

    async update(postID, postData){
        if (!mongoose.Types.ObjectId.isValid(postID)) {
            return { success: false, message: 'Invalid Post ID' }
        }

        try{
            const post = await this.getByID(postID)
            if(!post){
                return { success: false, message: 'Post not found' };
            }

            if(postData.caption){
                post.caption = postData.caption
            }
            if (postData.imageUrl){

                post.imageUrl = '/public/uploads/' + postData.imageUrl
            }

            await post.save()
            return {success: true, message: 'Post updated successfully', res: post}
            
        }catch(error){
            console.log(error)
            throw new ApplicationError(500, 'Server error')
        }
    }
}