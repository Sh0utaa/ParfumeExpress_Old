import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { db } from '../../database';

function SearchPage() {
  const [posts, setPosts] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchPostsBySearch = async () => {
      const queryParams = new URLSearchParams(location.search);
      const searchTerm = queryParams.get('query');

      if (searchTerm) {
        try {
          const results = await db.posts.searchByTitle(searchTerm);
          setPosts(results);
        } catch (error) {
          console.error('Error fetching search results:', error);
        }
      }
    };

    fetchPostsBySearch();
  }, [location.search]);

  return (
    <div className="search-page">
      <h1>Search Results</h1>
      <ul className="post-list">
        {posts.map((post) => (
          <li key={post.$id} className="post-card">
            <div className="image-container">
              <img src={post.ImageLink} alt={post.Title} />
            </div>
            <div className="card-title">
              <h5>{post.Title}</h5>
            </div>
            <div className="card-body">
              <p>
                {post.Body.split(' ').length > 10
                  ? post.Body.split(' ').slice(0, 10).join(' ') + '...'
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
}

export default SearchPage;
