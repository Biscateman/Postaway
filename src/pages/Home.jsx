import { useState, useEffect } from 'react';
import axios from 'axios';
import { Row, Col } from 'react-bootstrap';
import Post from '../components/Post';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [posts, setPosts] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/posts/all');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, [user, navigate]);

  return (
    <Row className="justify-content-center">
      <Col md={8}>
        <h1 className="mb-4">Feed</h1>
        <div className="d-flex flex-column gap-4">
          {posts.map((post) => (
            <Post key={post._id} post={post} />
          ))}
        </div>
      </Col>
    </Row>
  );
}

export default Home;