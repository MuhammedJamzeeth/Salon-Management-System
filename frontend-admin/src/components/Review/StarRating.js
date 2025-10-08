import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import './Testimonial.css';

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  const stars = [];
  for (let i = 0; i < fullStars; i++) {
    stars.push(<FontAwesomeIcon icon={faStar} key={i} />);
  }
  if (hasHalfStar) {
    stars.push(<FontAwesomeIcon icon={faStarHalfAlt} key="half" />);
  }

  return <div className="reviews">{stars}</div>;
};

export default StarRating;
