import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { db } from '../../database';
import '../static/Product.css'
import { useAuth } from '../utils/AuthContext';

const Product = () => {
    const { id } = useParams(); // Get post ID from the URL
    const [post, setPost] = useState(null);
    const [status, setStatus] = useState(Boolean);
    const user = useAuth();
    const navigate = useNavigate();

    
    useEffect(() => {
      const fetchPost = async () => {
        try {
          const postData = await db.posts.getById(id);
          setPost(postData);
        } catch (error) {
          console.error('Error fetching post:', error);
        }
      };

      const checkStatus = async () => {
        try {
          const response = await db.cart.isPostInCart(user.user.$id, id);
          setStatus(response)
        } catch (error) {
          console.error(error);
        }
      }
  
      checkStatus();
      fetchPost();
    }, [id]);

    const addToCart = async () => {
      try {
        const response = await db.cart.addUserCartEntry(user.user.$id, id);
        alert("post has been added to cart, " + response);

      } catch (error) {
        console.error(error);
      }
    }

    const goToCart = async () => {
      navigate(`/cart`);
    }

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

            {status && <button className="add-to-cart" onClick={goToCart}>Go to Cart</button>}
            {!status && <button className="add-to-cart" onClick={addToCart}>Add to Cart</button>}

            </div>
        </div>
        </div>
    );
}

export default Product