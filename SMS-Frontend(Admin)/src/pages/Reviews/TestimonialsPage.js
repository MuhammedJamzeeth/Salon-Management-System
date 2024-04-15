import React, { useState, useEffect } from 'react';
import Testimonial from '../../components/Review/Testimonial';
import './TestimonialsPage.css';


const TestimonialsPage = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await fetch('http://localhost:8080/reviews'); 
      const data = await response.json();
      setTestimonials(data);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    }
  };

  const Review = () => {
    return (
      <div>
        <section id="testimonials">
          <div className="testimonial-heading">
            
            <h1>Customer Reviews</h1>
          </div>
          <div className="testimonial-box-container">
            {testimonials.map((testimonial, index) => (
              <Testimonial key={index} testimonial={testimonial} />
            ))}
          </div>
        </section>
      </div>
    );
  };

  return <Review />;
};

export default TestimonialsPage;
