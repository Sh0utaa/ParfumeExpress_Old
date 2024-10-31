import React, { useEffect, useState } from 'react';
import { db } from '../../database';
import '../static/Home.css'
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [posts, setPosts] = useState([]); // State to hold the fetched posts
  const navigate = useNavigate();
  
  // Fetch the posts when the component mounts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await db.posts.list(); // Wait for the promise to resolve
        setPosts(response.documents); // Store the documents in state
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
      }
    };

    fetchPosts();
  }, []); // Empty dependency array ensures the effect runs only once
  
  
  const filterByGender = async (gender) => {
    try {
      // Fetch posts filtered by gender
      const response = await db.posts.filterByGender(gender);
      setPosts(response); // Update the posts state with the filtered results
    } catch (error) {
      console.error('Error filtering posts by gender:', error);
    }
  };
  

  const handlePostClick = (postId) => {
    navigate(`/product/${postId}`);
  };

  return (
      <div className="page-container">
        <div className="image-row">
          <div className="image-wrapper">
            <img src="src/Img/ManModel.png" 
            alt="Man Model" 
            className="model-img"
            onClick={() => filterByGender("Male")}
            />
            <div className="overlay"></div>
          </div>
          <div className="image-wrapper">
            <img src="src/Img/WomanModel.png" 
            alt="Woman Model" 
            className="model-img"
            onClick={() => filterByGender("Female")}
            />
            <div className="overlay"></div>
          </div>
          <div className="image-wrapper">
            <img src="src/Img/UnisexModel.png" 
            alt="Unisex Model" 
            className="model-img"
            onClick={() => filterByGender("Unisex")}
            />
            <div className="overlay"></div>
          </div>
        </div>

      <h1>Posts</h1>
      <ul className='post-list'>
        {posts.map((post) => (
          <li key={post.$id}
           className="post-card"
           onClick={() => handlePostClick(post.$id)} 
           >
            <div className="image-container">
              <img src={post.ImageLink} alt="" />
            </div>
            <div className="card-title">
              <h5>
                {post.Title}
              </h5>
            </div>
            <div className="card-body">
              <p>
                {post.Body.split(' ').length > 10 
                  ? post.Body.split(' ').slice(0, 20).join(' ') + '...' 
                  : post.Body}
              </p>
            </div>
              <p><strong>Price:</strong> ${post.Price}</p>
              <p><strong>Brand:</strong> {post.Brand}</p>
              <p><strong>Gender:</strong> {post.Gender}</p>
        </li>
        ))}
      </ul>

    </div>
  );
};

export default Home;
