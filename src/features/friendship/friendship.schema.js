import mongoose from "mongoose"

export const FriendshipSchema = new mongoose.Schema({
  requester: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
},
  recipient: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
},
  status: { 
    type: String, 
    enum: ['pending', 'accepted'], 
    default: 'pending' 
}
})