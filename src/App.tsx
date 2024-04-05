import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Importez BrowserRouter et utilisez-le comme Router

import Navbar from './components/NavBar';
import Home from './components/Home';
import User from './components/pages/User';
import { ToastContainer } from 'react-toastify';
import Book from './components/pages/Book';

function App() {
  return (
    <Router> {/* Utilisez Router au lieu de Router */}
      <div>
        <Navbar />
        <Routes>
          <Route path="/user" element={<User />} />
          <Route path="/book" element={<Book />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
      <ToastContainer />
    </Router>
  );
}

export default App;
