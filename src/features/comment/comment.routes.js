import express from 'express'
import { CommentController } from './comment.controller.js'
import checkPost from '../../middlewares/post.middleware.js'


const router = express.Router()

const commentController = new CommentController()

router.get('/:id', checkPost, commentController.getComments)
router.post('/:id', checkPost, commentController.postComment)
router.delete('/:id',  commentController.deleteComment)
router.put('/:id',  commentController.updateComment)

export default router