import mongoose from "mongoose"

export const PostSchema = mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User ID is required']
    },
    caption: {
        type: String,
        required: [true, 'Caption is required'],
        trim: true,
    },
    imageUrl: {
        type: String,
        required: [true, 'Image URL is required']
    },
    comment:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    likes:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Like'
    }]
})
