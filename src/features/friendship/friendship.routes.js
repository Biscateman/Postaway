import express from 'express';
import { FriendShipController } from './friendship.controller.js';
import jwtAuth from '../../middlewares/jwt.middleware.js';

const router = express.Router();

const controller = new FriendShipController();

router.use(jwtAuth)

router.get('/get-friends/:userId', (req, res, next) => {
    controller.getFriends(req, res, next);

});
router.get('/get-pending-requests', (req, res, next) => {
    controller.getPendingRequests(req, res, next);
} );
router.post('/toggle-friendship/:userId', (req, res, next) => {
    controller.toggleFriendship(req, res, next);
});
router.post('/response-to-request/:friendId', (req, res, next) => {
    controller.respondToRequest(req, res, next);
});

export default router;