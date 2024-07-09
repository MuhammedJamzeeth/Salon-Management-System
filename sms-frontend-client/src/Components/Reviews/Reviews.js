import React, { useState } from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Review.css';
import { FaTimes } from 'react-icons/fa'; 

const Reviews = ({ onClose }) => {
    const [number, setNumber] = useState(0);
    const [hoverStar, setHoverStar] = useState(undefined);
    const [comment, setComment] = useState('');
    const [reviewerName, setReviewerName] = useState('');

    const handleText = () => {
        switch (number || hoverStar) {
            case 0:
                return "Very Bad";
            case 1:
                return "Bad";
            case 2:
                return "Normal";
            case 3:
                return "Good";
            case 4:
                return "Very Good";
            case 5:
                return "Very Satisfied";
            default:
                return "Evaluate";
        }
    };

    const handlePlaceHolder = () => {
        switch (number || hoverStar) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
                return "Comment here...";
            default:
                return "Comment here...";
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        if (!reviewerName.trim()) {
            toast.error('Name field is required', {
                position: 'top-right'
            });
            return;
        }

        try {
            const response = await saveReview();
            if (response.status === 200) {
                toast.success('Review submitted successfully', {
                    position: 'top-right',
                    autoClose: 3000, 
                    hideProgressBar: true 
                });
                
                setNumber(0);
                setHoverStar(undefined);
                setComment('');
                setReviewerName('');
                onClose(); // Close the review component after successful submission
            } else {
                toast.error('Failed to submit review', {
                    position: 'top-right'
                });
            }
            console.log('Review submitted successfully');
        } catch (error) {
            console.error('Error submitting review:', error);
            toast.error('Error submitting review', {
                position: 'top-right'
            });
        }
    };

    const saveReview = async () => {
        const formData = new FormData();
        formData.append('rating', number);
        formData.append('comment', comment);
        formData.append('name', reviewerName);
        formData.append('date', new Date().toISOString()); 

        try {
            const response = await axios.post('http://localhost:8080/addReview', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Response:', response.data);
            return response;
        } catch (error) {
            console.error('Error saving review:', error);
            throw new Error('Failed to save review.');
        }
    };

    return (
        <div className="main">
            <div className="App">
                <div className="popup">
                    <div className="content">
                        <div className="product">
                            <h1>Reviews</h1>
                            <button className="close-icon" onClick={onClose}><FaTimes /></button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <h1>{handleText()}</h1>
                                {Array(5).fill().map((_, index) =>
                                    number >= index + 1 || hoverStar >= index + 1 ? (
                                        <AiFillStar
                                            key={index}
                                            onMouseOver={() => !number && setHoverStar(index + 1)}
                                            onMouseLeave={() => setHoverStar(undefined)}
                                            style={{ color: "orange" }}
                                            onClick={() => setNumber(index + 1)}
                                        />
                                    ) : (
                                        <AiOutlineStar
                                            key={index}
                                            onMouseOver={() => !number && setHoverStar(index + 1)}
                                            onMouseLeave={() => setHoverStar(undefined)}
                                            style={{ color: "orange" }}
                                            onClick={() => setNumber(index + 1)}
                                        />
                                    )
                                )}
                            </div>
                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder={handlePlaceHolder()}
                            ></textarea>
                            <input
                                type="text"
                                value={reviewerName}
                                onChange={(e) => setReviewerName(e.target.value)}
                                placeholder="Your Name"
                                className="nameInput"
                            />
                            <button
                                id='submitbtn'
                                className={!number ? "disabled" : ""}
                                disabled={!number}
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reviews;
