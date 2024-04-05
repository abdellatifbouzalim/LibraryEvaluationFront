import React, { useState, useEffect } from 'react';
import BookList from '../Book/BookList'; // Assuming you have a BookList component similar to UserList

const Book: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-900 py-4">List of Books</h2>
      <BookList />
    </div>
  );
};

export default Book;
