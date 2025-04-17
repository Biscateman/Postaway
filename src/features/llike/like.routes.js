import express from 'express'
import { LikeController } from './like.controller.js'
import checkPost from '../../middlewares/post.middleware.js'

const router =  express.Router()

const likeController = new LikeController()

router.get('/:id', checkPost, likeController.getLikes)
router.get('/toggle/:id', checkPost, likeController.toggleLike)

export default router