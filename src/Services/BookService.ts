
import { BookInstance } from './axiosInstance'; 
import { handleAxiosError } from './ApiError/AxiosErrorHandler';

const BookService = {
  getAllBooks: async () => {
    try {
      const response = await BookInstance.get(""); 
      return response.data;
    } catch (error) {
      handleAxiosError(error);
    }
  },

  createBook: async (book: any) => {
    try {
      const response = await BookInstance.post("", book); 
      return response.data;
    } catch (error) {
      handleAxiosError(error);
    }
  },

  updateBook: async (id: number, updatedBook: any) => {
    try {
      const response = await BookInstance.put(`/${id}`, updatedBook); 
      return response.data;
    } catch (error) {
      handleAxiosError(error);
    }
  },

  deleteBook: async (id: number) => {
    try {
      await BookInstance.delete(`/${id}`);
    } catch (error) {
      handleAxiosError(error);
    }
  },
};



export default BookService;
