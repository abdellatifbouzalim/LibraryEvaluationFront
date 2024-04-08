import React, { useState, useEffect } from 'react';
import ReviewList from '../Review/ReviewList';


export const Review: React.FC = () => {
    const [reviews, setReviews] = useState<Review[]>([]);
  

  
    return (
      <div>
              <h2 className="text-3xl font-bold mb-6 text-center text-gray-900 py-4">Reviews</h2>
        <ReviewList />
      </div>
    );
  };
  
  export default Review;
