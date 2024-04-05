import axios, { AxiosError } from 'axios';
import { UserInstance } from './axiosInstance'; // Import the named exports UserInstance and BookInstance

const UserService = {
  getAllUsers: async () => {
    try {
      const response = await UserInstance.get("");
      return response.data;
    } catch (error) {
      handleAxiosError(error);
    }
  },

  createUser: async (user: any) => {
    try {
      const response = await UserInstance.post("", user);
      return response.data;
    } catch (error) {
      handleAxiosError(error);
    }
  },

  updateUser: async (id: number, updatedUser: any) => {
    try {
      const response = await UserInstance.put(`/${id}`, updatedUser);
      return response.data;UserInstance
    } catch (error) {
      handleAxiosError(error);
    }
  },

  deleteUser: async (id: number) => {
    try {
      await UserInstance.delete(`/${id}`);
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

export default UserService;
