import { ApplicationError } from "../../middlewares/error.middleware.js";
import { LikeRepository } from "./like.repository.js";

export class LikeController {

    constructor() {
        this.likeRepository = new LikeRepository()
    }

    async getLikes(req, res, next){

        const type =  req.query.type
        if (!['Post', 'Comment'].includes(type)) {
            return res.status(400).json({ message: 'Invalid Type' });
        }
        try{
            const result = await this.likeRepository.get(type, req.params.id)
            if(result.length == 0){
                res.status(404).send('No likes found' );
            }else{
                res.status(200).send( result);
            }
        }catch(err){
            if(err instanceof ApplicationError){
                res.status(err.code).send({error: err})
            }else{
                res.status(500).send({error: 'Internal server error'})
            }
        }
    }

    async toggleLike(req, res, next){
        const type = req.body.type
        const id = req.params.id

        if (!['Post', 'Comment'].includes(type)) {
            return res.status(400).send('Invalid Type');
        }

        try{

            const result = await this.likeRepository.toggleLike(type, id, req.userID)
            res.status(200).send( result.message );

        }catch(err){
            if(err instanceof ApplicationError){
                res.status(err.status).send({error: err.message})
            }else{
                console.log(err)
                res.status(500).send({error: 'Internal server error'})
            }
        }
    }
}