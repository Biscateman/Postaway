import { PostModel } from "../features/post/post.model.js";
import { ApplicationError } from "./error.middleware.js";

const checkPost = (req,res, next)  => {

    const postID = req.params.id

    const result = PostModel.checkPost(postID)

    if(!result){
        throw new ApplicationError('Post not found',404)    
    }else{
        next()
    }
}

export default checkPost