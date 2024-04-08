import axios, { AxiosError } from 'axios';
import { UserInstance } from './axiosInstance'; // Import the named exports UserInstance and BookInstance
import { handleAxiosError } from './ApiError/AxiosErrorHandler';

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


export default UserService;
