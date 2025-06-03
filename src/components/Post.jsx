import { useState } from 'react';
import axios from 'axios';
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
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center mb-4">
        <img
          src={`https://ui-avatars.com/api/?name=${post.userID.name}`}
          alt={post.userID.name}
          className="w-10 h-10 rounded-full mr-4"
        />
        <span className="font-semibold">{post.userID.name}</span>
      </div>
      <img src={post.imageUrl} alt="Post" className="w-full rounded-lg mb-4" />
      <p className="mb-4">{post.caption}</p>
      <div className="flex items-center space-x-4">
        <button onClick={toggleLike} className="flex items-center space-x-1">
          {liked ? (
            <HeartSolidIcon className="w-6 h-6 text-red-500" />
          ) : (
            <HeartIcon className="w-6 h-6" />
          )}
          <span>{post.likes?.length || 0}</span>
        </button>
        <button onClick={fetchComments} className="flex items-center space-x-1">
          <ChatBubbleLeftIcon className="w-6 h-6" />
          <span>{post.comments?.length || 0}</span>
        </button>
      </div>
    </div>
  );
}

export default Post;