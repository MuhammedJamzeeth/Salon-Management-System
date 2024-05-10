import React, { useState } from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import './Review.css';
import axios from 'axios';

const Reviews = () => {
    const [number, setNumber] = useState(0);
    const [hoverStar, setHoverStar] = useState(undefined);
    const [comment, setComment] = useState('');

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
        try {
            await saveReview();
            console.log('Review submitted successfully');
        } catch (error) {
            console.error('Error submitting review:', error);
        }
    };

    const saveReview = async () => {
        const formData = new FormData();
        formData.append('rating', number);
        formData.append('comment', comment);

        try {
            const response = await axios.post('http://localhost:8080/addReview', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Response:', response.data); 
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
                            <button
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
