import express from 'express'
import { PostController } from './post.controller.js'
import { upload } from '../../middlewares/file-upload.middleware.js'
import jwtAuth from '../../middlewares/jwt.middleware.js'

const router = express.Router()

const postController = new PostController()


router.get('/all', (req, res, next) => {
    postController.getAllPosts(req, res, next)
})
router.get('/:postId', (req, res, next) => {
    postController.getPost(req, res, next)
})
router.get('/user/:userId', (req, res, next) => {
    postController.getPostsByUserId(req, res, next)
})
router.post('/', jwtAuth, upload.single('imageUrl'), (req, res, next) => {
    postController.createPost(req, res, next)
}) 
router.delete('/:postId', (req, res, next) => {
    postController.deletePost(req, res, next)
}) 
router.put('/:postId',  upload.single('imageUrl'), (req, res, next) => {
    postController.updatePost(req, res, next)
}) 

export default router