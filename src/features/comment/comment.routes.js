import express from 'express'
import { CommentController } from './comment.controller.js'


const router = express.Router()

const commentController = new CommentController()

router.get('/:postId', (req, res, next) => {
    commentController.getComments(req, res, next)
})
router.post('/:postId', (req, res, next) => {
    commentController.postComment(req, res, next)
})
router.delete('/:commentId',  (req, res, next) => {
    commentController.deleteComment(req, res, next)
})
router.put('/:commentId',  (req, res, next) => {
    commentController.updateComment(req, res, next)
})

export default router