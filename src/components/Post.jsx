import { useState } from 'react';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';
import { HeartIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';

function Post({ post }) {
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);

  const toggleLike = async () => {
    try {
      await axios.post(`http://localhost:3000/api/likes/toggle/${post._id}`, {
        type: 'Post'
      });
      setLiked(!liked);
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/comments/${post._id}`);
      setComments(response.data);
      setShowComments(true);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  return (
    <Card>
      <Card.Header className="d-flex align-items-center">
        <img
          src={`https://ui-avatars.com/api/?name=${post.userID.name}`}
          alt={post.userID.name}
          className="rounded-circle me-3"
          width="40"
          height="40"
        />
        <span className="fw-bold">{post.userID.name}</span>
      </Card.Header>
      <Card.Img variant="top" src={post.imageUrl} className="post-image" />
      <Card.Body>
        <Card.Text>{post.caption}</Card.Text>
        <div className="d-flex gap-3">
          <Button variant="link" onClick={toggleLike} className="p-0 text-dark">
            {liked ? (
              <HeartSolidIcon className="text-danger\" width={24} />
            ) : (
              <HeartIcon width={24} />
            )}
            <span className="ms-1">{post.likes?.length || 0}</span>
          </Button>
          <Button variant="link" onClick={fetchComments} className="p-0 text-dark">
            <ChatBubbleLeftIcon width={24} />
            <span className="ms-1">{post.comments?.length || 0}</span>
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default Post;