import { FriendShipRepository } from "./friendship.repository.js";

export class FriendShipController {
    
    constructor() {
        this.repo = new FriendShipRepository()
    }

    async getFriends(req, res, next){
        const userId = req.params.userId;
        const friends = await this.repo.getFriends(userId);
        res.json({ friends });
    }

    async getPendingRequests(req, res, next){
        const userId = req.userID;
        const requests = await this.repo.getPendingRequests(userId);
        res.json({ pendingRequests: requests });
    }

    async toggleFriendship(req,res, next){
        const { userId } = req.params;
        const currentUserId = req.userID;

        const existing = await this.repo.findFriendship(currentUserId, userId);

        if (existing) {
            await this.repo.deleteFriendRequest(existing._id);
            return res.json({ message: 'Friend request canceled or unfriended' });
        }

        const newRequest = await this.repo.createFriendRequest(currentUserId, userId);
        res.json({ message: 'Friend request sent', request: newRequest });
    }

    async respondToRequest(req, res, next){
        const { friendId } = req.params;
        const { action } = req.body; // 'accept' or 'reject'

        const requestId = await this.repo.findRequesterId(friendId, req.userID);
        if (!requestId) {
            return res.status(404).send({ message: 'Friend request not found' });
        }

        if (action === 'accept') {
            const updated = await this.repo.updateStatus(requestId, 'accepted');
            return res.json({ message: 'Friend request accepted', updated });
        } else {
            await this.repo.deleteFriendRequest(requestId);
            return res.json({ message: 'Friend request rejected' });
        }
    }

}