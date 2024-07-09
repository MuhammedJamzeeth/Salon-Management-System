import React from 'react'

const ContactBox = () => {

    const Testimonial = ({ testimonial, onDelete }) => {
        const { id, name, email, imageUrl,phone_number , message, date } = testimonial;


        const handleDelete = async () => {
            try {
              const response = await fetch(`http://localhost:8080/review/${id}`, {
                method: 'DELETE',
              });
        
              if (response.ok) {
                onDelete(id);
                console.log(`Testimonial with ID ${id} deleted successfully.`);
              } else {
                throw new Error('Failed to delete testimonial');
              }
            } catch (error) {
              console.error('Error deleting testimonial:', error);
            }
          };

          return (
            <div className="testimonial-box">
              <div className="box-top">
                <Profile name={name} date={new Date(date).toLocaleDateString()} imageUrl={imageUrl} />
             
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

export default ContactBox