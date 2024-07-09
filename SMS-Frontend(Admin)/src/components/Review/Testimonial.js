import React from 'react';
import Profile from './Profile';
import StarRating from './StarRating';
import './Testimonial.css';
import { Update } from '@mui/icons-material';

const Testimonial = ({ testimonial, onDelete, contact }) => {
  const { id, name, email, phoneNumber, imageUrl, rating, comment, message, date } = testimonial;

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:8080/${contact ? 'contact' : 'review'}/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        onDelete(id);
        console.log(`${contact ? 'Contact' : 'Testimonial'} with ID ${id} deleted successfully.`);
      } else {
        throw new Error(`Failed to delete ${contact ? 'contact' : 'testimonial'}`);
      }
    } catch (error) {
      console.error(`Error deleting ${contact ? 'contact' : 'testimonial'}:`, error);
    }
  };

  return (
    <div className="testimonial-box">
      <div className="box-top">
        <Profile name={name} date={new Date(date).toLocaleDateString()} imageUrl={imageUrl} />
        {!contact && <StarRating rating={rating} />}
        <button className="delete-button" onClick={handleDelete}>
          Delete
        </button>
      </div>
      <div className="customer-comment">
        <p>{contact ? message : comment}</p>
        {contact && (
          <div className="contact-details">
            <p>Email: {email}</p>
            <p>Phone: {phoneNumber}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Testimonial;
