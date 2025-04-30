import mongoose from "mongoose";

export const LikeSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'userID is required']
    },
    modelId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'model'
    },
    model: {
        type: String,
        enum: ['Post', 'Comment'],
        required: true
    },
    
})