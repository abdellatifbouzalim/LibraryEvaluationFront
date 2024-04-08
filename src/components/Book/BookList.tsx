import React, { useEffect, useState } from 'react';
import { faEdit, faSave, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import BookService from '../../Services/BookService';
import AddBookModal from './AddBookModal';
import { showToastDeleteConfirmation, showToastError, showToastInfo, showToastSuccess } from '../../core/utils/Toasts';

const BookList: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [editedBookId, setEditedBookId] = useState<number | null>(null);
  const [editedTitle, setEditedTitle] = useState<string>('');
  const [editedAuthor, setEditedAuthor] = useState<string>('');
  const [editedGenre, setEditedGenre] = useState<string>('');
  const [editedSummary, setEditedSummary] = useState<string>('');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const fetchedBooks = await BookService.getAllBooks();
        setBooks(fetchedBooks);
      } catch (error) {
        showToastError('Failed to fetch books');
      }
    };

    fetchBooks();
  }, []);

  const handleEdit = (id: number, title: string, author: string, genre: string, summary: string) => {
    setEditedBookId(id);
    setEditedTitle(title);
    setEditedAuthor(author);
    setEditedGenre(genre);
    setEditedSummary(summary);
  };

  const handleDelete = async (id: number) => {
    showToastDeleteConfirmation(id, "book", async () => {
      try {
        await BookService.deleteBook(id);
        const updatedBooks = books.filter(book => book.id !== id);
        setBooks(updatedBooks);
        showToastSuccess('Book deleted successfully');
      } catch (error) {
        showToastError('Failed to delete book');
      }
    });
  };

  const handleCancelEdit = () => {
    setEditedBookId(null);
    setEditedTitle('');
    setEditedAuthor('');
    setEditedGenre('');
    setEditedSummary('');
    showToastInfo('Edit canceled');
  };

  const handleSaveEdit = async (id: number) => {
    try {
      await BookService.updateBook(id, {
        title: editedTitle,
        author: editedAuthor,
        genre: editedGenre,
        summary: editedSummary,
      });
      const updatedBooks = books.map(book => {
        if (book.id === id) {
          return {
            ...book,
            title: editedTitle,
            author: editedAuthor,
            genre: editedGenre,
            summary: editedSummary,
          };
        }
        return book;
      });
      setBooks(updatedBooks);
      setEditedBookId(null);
      setEditedTitle('');
      setEditedAuthor('');
      setEditedGenre('');
      setEditedSummary('');
      showToastSuccess('Book updated successfully');
    } catch (error) {
      showToastError(`Failed to update book. ${error}`);
    }
  };

  return (
    <div className="mx-auto">
      <div className="overflow-x-auto">
        <AddBookModal />
        <table className="min-w-full divide-y divide-gray-200 shadow-lg rounded-lg overflow-hidden border border-gray-300">
        <thead className="bg-purple-700 text-white ">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                ID
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                Title
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                Author
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                Genre
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                Summary
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {books.map(book => (
              <tr key={book.id}>
                <td className="px-6 py-4 whitespace-nowrap">{book.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editedBookId === book.id ? (
                    <input
                      type="text"
                      value={editedTitle}
                      onChange={e => setEditedTitle(e.target.value)}
                      className="border border-gray-300 px-3 py-1"
                    />
                  ) : (
                    book.title
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editedBookId === book.id ? (
                    <input
                      type="text"
                      value={editedAuthor}
                      onChange={e => setEditedAuthor(e.target.value)}
                      className="border border-gray-300 px-3 py-1"
                    />
                  ) : (
                    book.author
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editedBookId === book.id ? (
                    <input
                      type="text"
                      value={editedGenre}
                      onChange={e => setEditedGenre(e.target.value)}
                      className="border border-gray-300 px-3 py-1"
                    />
                  ) : (
                    book.genre
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editedBookId === book.id ? (
                    <input
                      type="text"
                      value={editedSummary}
                      onChange={e => setEditedSummary(e.target.value)}
                      className="border border-gray-300 px-3 py-1"
                    />
                  ) : (
                    book.summary
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap space-x-2">
                  {editedBookId === book.id ? (
                    <>
                      <button
                        className="bg-green-500 hover:bg-green-700 text-white py-1 px-3 rounded"
                        onClick={() => handleSaveEdit(book.id)}
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
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-3 rounded"
                      onClick={() => handleEdit(book.id, book.title!, book.author!, book.genre!, book.summary!)}
                    >
                      <FontAwesomeIcon icon={faEdit} /> Edit
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(book.id)}
                    className="bg-red-500 hover:bg-red-700 text-white py-1 px-3 rounded"
                  >
                    <FontAwesomeIcon icon={faTrash} /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {books.length === 0 ? (
          <p className="text-center text-red-500">Books Table is empty !!</p>
        ) : (   <p></p>)}
      
      </div>
      
    </div>
    
  );
};

export default BookList;
