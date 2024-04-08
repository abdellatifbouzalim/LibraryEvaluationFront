import React, { useState } from 'react';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import UserService from '../../Services/UserService';
import { toast } from 'react-toastify';
import { showToastError, showToastSuccess } from '../../core/utils/Toasts';

const AddUserModal = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setUsername('');
    setEmail('');
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const newUser = {
        username: username,
        email: email,
      };
      await UserService.createUser(newUser);
      showToastSuccess('Loan added successfully');
      UserService.getAllUsers();
      closeModal();
    } catch (error) {
      console.error('Error adding user:', error);
      showToastError('Failed to add user');
    }
  };

  return (
    <div>
        <button onClick={openModal} className="bg-purple-700 text-white px-4 py-2 rounded mb-4">
        <FontAwesomeIcon icon={faPlus} className="mr-2" /> Add User
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="modal fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center"
        overlayClassName="overlay"
        ariaHideApp={false}
      >
              <div className="bg-white rounded-lg w-[60vh]  shadow-2xl p-6 ml-20 border-4">
          <h2 className="text-2xl mb-4 text-center font-bold text-gray-800">Add User</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} className="block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" required />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" required />
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

export default AddUserModal;
