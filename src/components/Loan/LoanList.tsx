import React, { useEffect, useState } from 'react';
import { faEdit, faSave, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LoanService from '../../Services/LoanService';
import AddLoanModal from './AddLoanModal';
import UserService from '../../Services/UserService';
import BookService from '../../Services/BookService';
import { showToastDeleteConfirmation, showToastError, showToastInfo, showToastSuccess } from '../../core/utils/Toasts';

const LoanList: React.FC = () => {
    const [loans, setLoans] = useState<Loan[]>([]);
    const [editedLoanId, setEditedLoanId] = useState<number | null>(null);
    const [editedBorrowDate, setEditedBorrowDate] = useState<string>('');
    const [borrowingUsers, setBorrowingUsers] = useState<User[]>([]);
    const [books, setBooks] = useState<Book[]>([]);
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
    const [selectedBookId, setSelectedBookId] = useState<number | null>(null);
    const [hoveredLoanId, setHoveredLoanId] = useState<number | null>(null);
    const [hoveredBookId, setHoveredBookId] = useState<number | null>(null);

    useEffect(() => {
        fetchInitialData();
    }, []);

    const fetchInitialData = async () => {
        try {
            const fetchedLoans = await LoanService.getAllLoans();
            setLoans(fetchedLoans);
            const fetchedUsers = await UserService.getAllUsers();
            setBorrowingUsers(fetchedUsers);
            const fetchedBooks = await BookService.getAllBooks();
            setBooks(fetchedBooks);
        } catch (error) {
            showToastError('Failed to fetch data');
        }
    };

    const handleEdit = (id: number, borrowDate: string, userId: number | null, bookId: number | null) => {
        setEditedLoanId(id);
        setEditedBorrowDate(borrowDate);
        setSelectedUserId(userId);
        setSelectedBookId(bookId);
    };

    const handleDelete = async (id: number) => {
        showToastDeleteConfirmation(id, "loan", async () => {
            try {
                await LoanService.deleteLoan(id);
                const updatedLoans = loans.filter(loan => loan.id !== id);
                setLoans(updatedLoans);
                showToastSuccess('Loan deleted successfully');
            } catch (error) {
                showToastError('Failed to delete loan');
            }
        });
    };

    const handleCancelEdit = () => {
        setEditedLoanId(null);
        setEditedBorrowDate('');
        setSelectedUserId(null);
        setSelectedBookId(null);
        showToastInfo('Edit canceled');
    };

    const handleSaveEdit = async (id: number) => {
        try {
            await LoanService.updateLoan(id, {
                borrowDate: editedBorrowDate,
                book: {
                    id: selectedBookId!,
                },
                borrowingUser: {
                    id: selectedUserId!,
                },
            });
            // Perform any necessary cleanup after successful update
            setEditedLoanId(null);
            setEditedBorrowDate('');
            setSelectedUserId(null);
            setSelectedBookId(null);
            showToastSuccess('Loan updated successfully');
        } catch (error) {
            showToastError(`Failed to update loan. ${error}`);
        }
    };

    return (
        <div className="mx-auto">
            <div className="overflow-x-auto table-responsive ">
                <AddLoanModal />
                
                <table className="table-auto min-w-full divide-y divide-gray-200 shadow-lg rounded-lg overflow-hidden border border-purple-700">
                    <thead className="bg-purple-700 text-white ">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                ID
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                Borrow Date
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                Borrowing User
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                Book Title
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 ">
                        {loans.map(loan => (
                            <tr key={loan.id}>
                                <td className="px-6 py-4 whitespace-nowrap">{loan.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {editedLoanId === loan.id ? (
                                        <input
                                            type="date"
                                            value={editedBorrowDate}
                                            onChange={e => setEditedBorrowDate(e.target.value)}
                                            className="border border-gray-300 px-3 py-1"
                                        />
                                    ) : (
                                        loan.borrowDate
                                    )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {editedLoanId === loan.id ? (
                                        <select
                                            value={selectedUserId!}
                                            onChange={e => setSelectedUserId(Number(e.target.value))}
                                            className="border border-gray-300 px-3 py-1"
                                        >
                                            {borrowingUsers.map(user => (
                                                <option key={user.id} value={user.id}>
                                                    {user.username}
                                                </option>
                                            ))}
                                        </select>
                                    ) : (
                                        <span
                                            className="cursor-pointer"
                                            onMouseEnter={() => setHoveredLoanId(loan.id!)}
                                            onMouseLeave={() => setHoveredLoanId(null)}
                                        >
                                            {loan.borrowingUser ? loan.borrowingUser.username : 'Unknown User'}
                                        </span>
                                    )}
                                    {hoveredLoanId === loan.id && (
                                        <div className="absolute bg-white border border-gray-300 p-2 shadow-lg rounded-lg">
                                            <p className="text-sm font-semibold">User Information</p>
                                            <hr className="my-2 border-gray-300" />
                                            <div className="flex flex-col gap-1">
                                                <p className="text-xs">
                                                    <span className="font-semibold">ID:</span> {loan.borrowingUser.id}
                                                </p>
                                                <p className="text-xs">
                                                    <span className="font-semibold">Username:</span> {loan.borrowingUser.username}
                                                </p>
                                                <p className="text-xs">
                                                    <span className="font-semibold">Email:</span> {loan.borrowingUser.email}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {editedLoanId === loan.id ? (
                                        <select
                                            value={selectedBookId!}
                                            onChange={e => setSelectedBookId(Number(e.target.value))}
                                            className="border border-gray-300 px-3 py-1"
                                        >
                                            {books.map(book => (
                                                <option key={book.id} value={book.id}>
                                                    {book.title}
                                                </option>
                                            ))}
                                        </select>
                                    ) : (
                                        <span
                                            className="cursor-pointer"
                                            onMouseEnter={() => setHoveredBookId(loan.id!)}
                                            onMouseLeave={() => setHoveredBookId(null)}
                                        >
                                            {loan.book ? loan.book.title : 'Unknown Book'}
                                        </span>
                                    )}
                                    {hoveredBookId === loan.id && (
                                        <div className="absolute bg-white border border-gray-300 p-5 shadow-lg rounded-lg">
                                            <p className="text-sm font-semibold">Book Information</p>
                                            <hr className="my-2 border-gray-300" />
                                            <div className="flex flex-col gap-1">
                                                <p className="text-xs">
                                                    <span className="font-semibold">ID:</span> {loan.book.id}
                                                </p>
                                                <p className="text-xs">
                                                    <span className="font-semibold">Title:</span> {loan.book.title}
                                                </p>
                                                <p className="text-xs">
                                                    <span className="font-semibold">Author:</span> {loan.book.author}
                                                </p>
                                                <p className="text-xs">
                                                    <span className="font-semibold">Genre:</span> {loan.book.genre}
                                                </p>
                                                <p className="text-xs">
                                                    <span className="font-semibold">Summary:</span> {loan.book.summary}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    {editedLoanId === loan.id ? (
                                        <>
                                            <button
                                                className="bg-green-500 hover:bg-green-700 text-white py-1 px-3 rounded"
                                                onClick={() => handleSaveEdit(loan.id!)}
                                            >
                                                <FontAwesomeIcon icon={faSave} /> Save
                                            </button>
                                            <button
                                                className="bg-gray-500 hover:bg-gray-700 text-white py-1 px-3 rounded"
                                                onClick={handleCancelEdit}
                                            >
                                                <FontAwesomeIcon icon={faTimes} /> Cancel
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button
                                                className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-3 rounded"
                                                onClick={() => handleEdit(loan.id!, loan.borrowDate, loan.borrowingUser.id, loan.book.id)}
                                            >
                                                <FontAwesomeIcon icon={faEdit} /> Edit
                                            </button>


                                        </>
                                    )}  <button
                                        onClick={() => handleDelete(loan.id!)}
                                        className="bg-red-500 hover:bg-red-700 text-white py-1 px-3 rounded"
                                    >
                                        <FontAwesomeIcon icon={faTrash} /> Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {loans.length === 0 ? (
          <p className="text-center text-red-500">Loans Table is empty !!</p>
        ) : (   <p></p>)}
            
            </div>
        </div>
    );
};

export default LoanList;
