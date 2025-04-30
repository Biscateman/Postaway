import dotenv from 'dotenv';
dotenv.config(); // Load environment variables from .env file

import express from 'express'
import cookieParser from 'cookie-parser'
import jwtAuth from './src/middlewares/jwt.middleware.js'

import userRoutes from './src/features/user/user.routes.js'
import postRoutes from './src/features/post/post.routes.js'
import commentRoutes from './src/features/comment/comment.routes.js'
import likeRoutes from './src/features/llike/like.routes.js'
import bodyParser from 'body-parser'
import { serverError } from './src/middlewares/error.middleware.js'
import {loggerMiddleware} from './src/middlewares/logger.middleware.js'
import { connectToMongoDB } from './src/config/mongodb.js'
import friendshipRoutes from './src/features/friendship/friendship.routes.js'
import otpRoutes from './src/features/otp/otp.routes.js'

const app = express()


app.use(cookieParser())
app.use(bodyParser.json())

connectToMongoDB()

app.use(loggerMiddleware)
app.use('/api/users/', userRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/comments', jwtAuth, commentRoutes)
app.use('/api/likes', jwtAuth, likeRoutes)
app.use('/api/friends',  friendshipRoutes)
app.use('/api/otp' , otpRoutes)

app.get('/', (req, res) => {
    res.send('Welcome to Postaway API')
})

app.use((req, res, next) => {
    res.status(404).json({ error: 'API endpoint not found' });
  });

app.use(serverError)


app.listen(3000)

console.log('Server is running on port 3000')