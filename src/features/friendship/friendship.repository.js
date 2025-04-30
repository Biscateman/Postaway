import mongoose from "mongoose";
import { FriendshipSchema } from "./friendship.schema.js";

const friendShipModel =  mongoose.model('Friendship', FriendshipSchema);

export class FriendShipRepository {
    async findFriendship(user1, user2) {  
        const result = await friendShipModel.findOne({
            $or: [
              { requester: user1, recipient: user2 },
              { requester: user2, recipient: user1 }
            ]
          });
        
        return result;
    }

    async getFriends(userId){
        const result = await friendShipModel.find({
            $or: [
              { requester: userId, status: 'accepted' },
              { recipient: userId, status: 'accepted' }
            ]
            }).populate('requester recipient');
        
        return result
    }

    async getPendingRequests(userId){
        const result = await  friendShipModel.find({
            recipient: userId,
            status: 'pending'
          }).populate('requester');
        return result
    }

    async createFriendRequest(requester, recipient){
        return new friendShipModel({ requester, recipient }).save();
    }

    async updateStatus(id, status){
        return friendShipModel.findByIdAndUpdate(id, { status }, { new: true });
    }

    async deleteFriendRequest(id){
        return friendShipModel.findByIdAndDelete(id);
    }

    async findRequesterId(friendId, userId){
        const friendship = await friendShipModel.findOne({
            recipient: userId,
            requester: friendId
        });
        return friendship ? friendship._id : null;
    }
}

