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
      if (response.ok) {
        const data = await response.json();
        setTestimonials(data);
      } else {
        throw new Error('Failed to fetch testimonials');
      }
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    }
  };

  const handleDeleteTestimonial = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/review/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setTestimonials((prevTestimonials) =>
          prevTestimonials.filter((testimonial) => testimonial.id !== id)
        
        );
        console.log(`Testimonial with ID ${id} deleted successfully.`);
      } else {
        throw new Error('Failed to delete testimonial');
      }
    } catch (error) {
      console.error('Error deleting testimonial:', error);
    }
  };

  return (
    <div>
      <section id="testimonials">
        <div className="testimonial-heading">
          <h1>Customer Reviews</h1>
        </div>
        <div className="testimonial-box-container">
          {testimonials.map((testimonial) => (
            <Testimonial
              key={testimonial.id}
              testimonial={testimonial}
              onDelete={handleDeleteTestimonial}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default TestimonialsPage;
