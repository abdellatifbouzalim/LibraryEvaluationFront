import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <ul className="flex justify-center space-x-4">
        <li>
          <Link to="/" className="hover:text-gray-300">Home</Link>
        </li>
        <li>
          <Link to="/user" className="hover:text-gray-300">Users</Link>
        </li>
        <li>
          <Link to="/book" className="hover:text-gray-300">Books</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
