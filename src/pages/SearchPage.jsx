import React, { useEffect, useState } from 'react';
import { db } from '../../database';
import { useLocation } from 'react-router-dom';
import '../static/SearchPage.css'

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

    // Call fetchPostsBySearch with the current search term when the component mounts or when searchTerm changes
    fetchPostsBySearch(searchTerm);
  }, [searchTerm]); // Add searchTerm to dependency array

  const handleSearch = (event) => {
    event.preventDefault(); // Prevent page refresh on form submission
    setSearchTerm(searchTerm.trim()); // Update the search term and trigger useEffect
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch(event); // Trigger search on Enter key press
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
          onKeyPress={handleKeyPress} // Trigger search on Enter key press
        />
        <button type="submit">Search</button>
      </form>
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
