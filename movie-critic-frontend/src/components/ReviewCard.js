import React from 'react';
import "./reviewcard.css";

const ReviewCard = ({ comment, rating, reviewer }) => {
    return (
        <div className="review-card">
            <div className='spanClass'>
                <div className="comment">{comment}</div>
                <div className="rating">Rating: {rating}/10</div>
            </div>



            <div className="reviewer">By {reviewer}</div>
        </div>
    );
}

export default ReviewCard;
