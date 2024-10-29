import React from 'react'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { db } from '../../database';
import '../static/Product.css'


const Product = () => {
    const { id } = useParams(); // Get post ID from the URL
    const [post, setPost] = useState(null);
  
    useEffect(() => {
      const fetchPost = async () => {
        try {
          const postData = await db.posts.getById(id);
          setPost(postData);
        } catch (error) {
          console.error('Error fetching post:', error);
        }
      };
  
      fetchPost();
    }, [id]);
  
    if (!post) return <p>Loading...</p>;
  
    return (
        <div className="product-container">
        <div className="product-image">
            <img src={post.ImageLink} alt={post.Title} />
        </div>
        <div className="product-info">
            <h1>{post.Title}</h1>
            <p>{post.Body}</p>
            <p><strong>Price:</strong> ${post.Price}</p>
            <p><strong>Brand:</strong> {post.Brand}</p>
            <p><strong>Gender:</strong> {post.Gender}</p>
            <div className="payment-section">
            <button className="buy-now">Buy Now</button>
            <button className="add-to-cart">Add to Cart</button>
            </div>
        </div>
        </div>
    );
}

export default Product