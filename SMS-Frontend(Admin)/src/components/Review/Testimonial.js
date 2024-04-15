import React from 'react';
import Profile from './Profile';
import StarRating from './StarRating';
import './Testimonial.css';

const Testimonial = ({ testimonial, onDelete }) => {
  const { id, name, username, imageUrl, rating, comment } = testimonial;

  const handleDelete = () => {
   
    fetch(`http://localhost:8080/review/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          
          onDelete(id); 
        } else {
          throw new Error('Failed to delete testimonial');
        }
      })
      .catch(error => {
        console.error('Error deleting testimonial:', error);
      });
  };

  return (
    <div className="testimonial-box">
      <div className="box-top">
        <Profile name={name} username={username} imageUrl={imageUrl} />
        <StarRating rating={rating} />
        <button className="delete-button" onClick={handleDelete}>
          Delete
        </button>
      </div>
      <div className="customer-comment">
        <p>{comment}</p>
      </div>
    </div>
  );
};

export default Testimonial;
