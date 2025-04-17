import { LikeModel } from "./like.model.js";
import { ApplicationError } from "../../middlewares/error.middleware.js";

export class LikeController {
    getLikes(req, res){
        const postID = req.params.id
        const likes = LikeModel.get(postID)
        if(likes.length > 0){
            res.status(200).send(likes)
        }else{
            throw new ApplicationError('Likes not found',400)    
        }
    }

    toggleLike(req, res){
        const postID = req.params.id
        const userID = req.userID
        const result = LikeModel.toggle(userID, postID)
        res.status(200).send(result)
    }
}