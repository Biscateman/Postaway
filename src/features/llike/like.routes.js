import express from 'express'
import { LikeController } from './like.controller.js'

const router =  express.Router()

const likeController = new LikeController()

router.get('/:id',  (req, res, next) => {   
    likeController.getLikes(req, res, next)
})
router.post('/toggle/:id', (req, res, next) => {
    likeController.toggleLike(req, res, next)
})

export default router