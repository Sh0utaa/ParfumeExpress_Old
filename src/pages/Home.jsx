import React, { useEffect, useState } from 'react';
import { db } from '../../database';
import '../static/Home.css'

const Home = () => {
  const [posts, setPosts] = useState([]); // State to hold the fetched posts

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




  return (
      <div className="page-container">
        <div className="image-row">
          <div className="image-wrapper">
            <img src="src/Img/ManModel.png" alt="Man Model" className="model-img" />
            <div className="overlay"></div>
          </div>
          <div className="image-wrapper">
            <img src="src/Img/WomanModel.png" alt="Woman Model" className="model-img" />
            <div className="overlay"></div>
          </div>
          <div className="image-wrapper">
            <img src="src/Img/UnisexModel.png" alt="Unisex Model" className="model-img" />
            <div className="overlay"></div>
          </div>
        </div>

      <h1>Posts</h1>
      <ul className="post-list">
        {posts.map((post) => (
          <li key={post.$id} className="post-card">
            <h2>{post.Title}</h2>
            <p>{post.Body}</p>
            <p><strong>Price:</strong> ${post.Price}</p>
            <p><strong>Brand:</strong> {post.Brand}</p>
            <p><strong>Gender:</strong> {post.Gender}</p>
            {/* <p><strong>Image URL:</strong> {post.ImageLink}</p> */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
