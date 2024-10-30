import React, { useEffect, useState } from 'react';
import { db } from '../../database';
import { useLocation } from 'react-router-dom';
import '../Static/SearchPage.css'; // Import your CSS file

function SearchPage() {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();

  useEffect(() => {
    const fetchPostsBySearch = async (term) => {
      if (term) {
        try {
          const results = await db.posts.searchByTitle(term);
          setPosts(results);
        } catch (error) {
          console.error('Error fetching search results:', error);
        }
      }
    };

    fetchPostsBySearch(searchTerm);
  }, [searchTerm]);

  const handleSearch = (event) => {
    event.preventDefault();
    setSearchTerm(searchTerm.trim());
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch(event);
    }
  };

  return (
    <div className="search-page">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search posts by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button type="submit">Search</button>
      </form>
      <ul className="post-list">
        {posts.map((post) => (
          <li key={post.$id} className="post-card">
            <div className="image-wrapper">
              <img className="model-img" src={post.ImageLink} alt={post.Title} />
              {/* Removed overlay div */}
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
