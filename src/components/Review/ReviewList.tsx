import React, { useEffect, useState } from 'react';
import ReviewService from '../../Services/ReviewService';
import BookService from '../../Services/BookService';
import UserService from '../../Services/UserService';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ReviewList = () => {
    const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState({
    book: {id:''},
    user: {id:''},
    stars: '',
    comment: '',
    date: new Date().toISOString().split('T')[0], // Current date
  });
  const [users, setUsers] = useState<User[]>([]);
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await ReviewService.getAllReviews();
        setReviews(response);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    const fetchUsersAndBooks = async () => {
      try {
        const usersResponse = await UserService.getAllUsers();
        const booksResponse = await BookService.getAllBooks();
        setUsers(usersResponse);
        setBooks(booksResponse);
      } catch (error) {
        console.error('Error fetching users or books:', error);
      }
    };

    fetchReviews();
    fetchUsersAndBooks();
  }, []);

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setNewReview({ ...newReview, [name]: value });
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      await ReviewService.createReview(newReview);
      // Assuming createReview updates the reviews state or you can fetch all reviews again
      // setReviews([...reviews, newReview]);
      console.log('Review added successfully');
      setNewReview({
        book: {id:''},
        user: {id:''},
        stars: '',
        comment: '',
        date: new Date().toISOString().split('T')[0], // Reset to current date after adding review
      });
    } catch (error) {
      console.error('Error adding review:', error);
    }
  };

  return (
    <div className="flex flex-wrap justify-center border-2 flex-col">
      <div className="w-full rounded overflow-hidden shadow-lg bg-white ">
        <form onSubmit={handleSubmit} className="px-6 py-4">
          <div className="mb-4">
            <label htmlFor="userId" className="block text-sm font-semibold text-gray-700">
              User ID
            </label>
            <select
              id="userId"
              name="userId"
              value={newReview.user.id}
              onChange={handleChange}
              className="block w-full mt-1 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Select user</option>
              {users.map(user => (
                <option key={user.id} value={user.id}>{user.username}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="bookId" className="block text-sm font-semibold text-gray-700">
              Book ID
            </label>
            <select
              id="bookId"
              name="bookId"
              value={newReview.book.id}
              onChange={handleChange}
              className="block w-full mt-1 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Select book</option>
              {books.map(book => (
                <option key={book.id} value={book.id}>{book.title}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="stars" className="block text-sm font-semibold text-gray-700">
              Stars
            </label>
            <input
              type="number"
              id="stars"
              name="stars"
              value={newReview.stars}
              onChange={handleChange}
              className="block w-full mt-1 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="comment" className="block text-sm font-semibold text-gray-700">
              Comment
            </label>
            <textarea
              id="comment"
              name="comment"
              value={newReview.comment}
              onChange={handleChange}
              rows={3}
              className="block w-full mt-1 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            ></textarea>
          </div>
          <button
            type="submit"
            className="inline-block bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Add Review
          </button>
        </form>
      </div>
      {reviews.map(review => (
        <div key={review.id} className="w-full rounded overflow-hidden shadow-lg bg-white flex-1 mt-4">
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">Book title : {review.book.title}</div>
            <p className="text-gray-700 text-base">Comment : {review.comment}</p>
          </div>
          <div className="px-6 py-4 flex items-center justify-between">
            <div>
              <FontAwesomeIcon icon={faStar} className="w-5 h-5 text-gold" />
              <span className="text-gold-400 ml-1">{review.stars} Stars</span>
            </div>
            <span className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 ml-2">
              Date : {review.date}
            </span>
            <span className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 ml-2">
              Username : {review.user.username}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
