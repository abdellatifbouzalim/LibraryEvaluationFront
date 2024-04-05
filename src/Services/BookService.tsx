import axios, { AxiosError } from 'axios';
import { BookInstance } from './axiosInstance'; // Import the named export BookInstance

const BookService = {
  getAllBooks: async () => {
    try {
      const response = await BookInstance.get(""); // Endpoint to fetch all books
      return response.data;
    } catch (error) {
      handleAxiosError(error);
    }
  },

  createBook: async (book: any) => {
    try {
      const response = await BookInstance.post("", book); // Endpoint to create a new book
      return response.data;
    } catch (error) {
      handleAxiosError(error);
    }
  },

  updateBook: async (id: number, updatedBook: any) => {
    try {
      const response = await BookInstance.put(`/${id}`, updatedBook); // Endpoint to update a book by ID
      return response.data;
    } catch (error) {
      handleAxiosError(error);
    }
  },

  deleteBook: async (id: number) => {
    try {
      await BookInstance.delete(`/${id}`); // Endpoint to delete a book by ID
    } catch (error) {
      handleAxiosError(error);
    }
  },
};

const handleAxiosError = (error: AxiosError<ApiError> | Error | unknown) => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ApiError>;
    if (axiosError.response) {
      const errorMessage = axiosError.response.data.message || 'Server Error';
      throw new Error(errorMessage);
    } else if (axiosError.request) {
      throw new Error('No response from server');
    } else {
      throw new Error('Request error');
    }
  } else {
    throw error instanceof Error ? error : new Error('Unknown error');
  }
};

export default BookService;
