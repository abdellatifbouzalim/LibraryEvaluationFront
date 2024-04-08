import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import LoanService from '../../Services/LoanService';
import UserService from '../../Services/UserService';
import BookService from '../../Services/BookService';
import { showToastError, showToastSuccess } from '../../core/utils/Toasts'; // Import the toast functions
import { toast } from 'react-toastify';

const AddLoanModal: React.FC = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [borrowDate, setBorrowDate] = useState('');
  const [books, setBooks] = useState<Book[]>([]);
  const [borrowingUsers, setBorrowingUsers] = useState<User[]>([]);
  const [selectedBookId, setSelectedBookId] = useState<number | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const fetchedBooks = await BookService.getAllBooks();
        setBooks(fetchedBooks);
      } catch (error) {
        showToastError('Error fetching books');
      }
    };

    const fetchUsers = async () => {
      try {
        const fetchedUsers = await UserService.getAllUsers();
        setBorrowingUsers(fetchedUsers);
      } catch (error) {
        showToastError('Error fetching users');
      }
    };

    fetchBooks();
    fetchUsers();
  }, []);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setBorrowDate('');
    setSelectedBookId(null);
    setSelectedUserId(null);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const newLoan: Loan = {
        borrowDate: borrowDate,
        book: {
          id: selectedBookId!,
        },
        borrowingUser: {
          id: selectedUserId!,
        },
      };
      
      await LoanService.createLoan(newLoan);
      showToastSuccess('Loan added successfully');
      closeModal();
    } catch (error) {
      showToastError('Failed to add loan');
    }
  };

  return (
    <div >
      <button onClick={openModal} className="bg-purple-700 text-white px-4 py-2 rounded mb-4">
        <FontAwesomeIcon icon={faPlus} className="mr-2" /> Add Loan
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="modal shadow-purple fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center"
        overlayClassName="overlay"
        ariaHideApp={false}
      >
        <div className="bg-white rounded-lg w-[60vh]  shadow-2xl p-6 ml-20 border-4">
          <h2 className="text-2xl mb-4 text-center font-bold text-gray-800">Add Loan</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="borrowDate" className="block text-sm font-medium text-gray-700 mb-1">Borrow Date</label>
              <input type="date" id="borrowDate" name="borrowDate" value={borrowDate} onChange={(e) => setBorrowDate(e.target.value)} className="block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" required />
            </div>
            <div className="mb-4">
              <label htmlFor="book" className="block text-sm font-medium text-gray-700 mb-1">Book</label>
              <select id="book" name="book" value={selectedBookId || ''} onChange={(e) => setSelectedBookId(parseInt(e.target.value))} className="block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" required>
                <option value="">Select a book</option>
                {books.map(book => (
                  <option key={book.id} value={book.id}>{book.title}</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="borrowingUser" className="block text-sm font-medium text-gray-700 mb-1">Borrowing User</label>
              <select id="borrowingUser" name="borrowingUser" value={selectedUserId || ''} onChange={(e) => setSelectedUserId(parseInt(e.target.value))} className="block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" required>
                <option value="">Select a user</option>
                {borrowingUsers.map(user => (
                  <option key={user.id} value={user.id}>{user.username}</option>
                ))}
              </select>
            </div>
            <div className="flex justify-end">
              <button type="submit" className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded mr-2">Add</button>
              <button type="button" onClick={closeModal} className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded">Cancel</button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default AddLoanModal;
