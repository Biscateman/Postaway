import mongoose from "mongoose";

export const CommentSchema = mongoose.Schema({ 
    postID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: [true, 'Post ID is required']
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User ID is required']
    },
    comment: {
        type: String,
        required: [true, 'Comment is required'],
        trim: true,
    },
    likes:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Like'
    }]
})