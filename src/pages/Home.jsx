import React, { useEffect, useState } from 'react';
import { db } from '../../database';

const Home = () => {
  const [posts, setPosts] = useState([]); // State to hold the fetched posts
  const [loading, setLoading] = useState(true); // State to show a loading indicator

  // Fetch the posts when the component mounts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await db.posts.list(); // Wait for the promise to resolve
        setPosts(response.documents); // Store the documents in state
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false); // Stop the loading indicator
      }
    };

    fetchPosts();
  }, []); // Empty dependency array ensures the effect runs only once

  if (loading) return <p>Loading...</p>; // Show loading indicator

  return (
    <div className="container">
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.$id}> {/* Use $id as the unique key */}
            <h2>{post.Title}</h2>
            <p>{post.Body}</p>
            <p><strong>Price:</strong> ${post.Price}</p>
            <p><strong>Brand:</strong> {post.Brand}</p>
            <p><strong>Gender:</strong> {post.Gender}</p>
            <p><strong>IMGURL:</strong> {post.ImageLink}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
