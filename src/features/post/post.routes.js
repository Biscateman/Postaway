import express from 'express'
import { PostController } from './post.controller.js'
import { upload } from '../../middlewares/file-upload.middleware.js'

const router = express.Router()

const postController = new PostController()


router.get('/', postController.getPosts)
router.get('/:id',  postController.getPost)
router.post('/', upload.single('imageUrl'), postController.createPost)
router.delete('/:id', postController.deletePost)
router.put('/:id', upload.single('imageUrl'), postController.updatePost)

export default router