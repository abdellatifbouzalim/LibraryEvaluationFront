import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Importez BrowserRouter et utilisez-le comme Router

import Navbar from './components/SideBar';
import Home from './components/Home';
import User from './components/pages/User';
import { ToastContainer } from 'react-toastify';
import Book from './components/pages/Book';
import Loan from './components/pages/Loan';
import { Review } from './components/pages/Review';

function App() {
  return (
    <Router>
      <div className="flex">
        <Navbar />
        <div className="flex-1 p-10"> {/* Added padding */}
          <Routes>
            <Route path="/user" element={<User />} />
            <Route path="/book" element={<Book />} />
            <Route path="/loan" element={<Loan />} />
            <Route path="/review" element={<Review />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </div>
      <ToastContainer />
    </Router>
  );
}

export default App;
