import { LoanInstance } from './axiosInstance';
import { handleAxiosError } from './ApiError/AxiosErrorHandler';

const LoanService = {
  getAllLoans: async () => {
    try {
      const response = await LoanInstance.get("");
      return response.data;
    } catch (error) {
      handleAxiosError(error);
    }
  },

  createLoan: async (loan: any) => {
    try {
      const response = await LoanInstance.post("", loan);
      return response.data;
    } catch (error) {
      handleAxiosError(error);
    }
  },

  updateLoan: async (id: number, updatedLoan: any) => {
    try {
      const response = await LoanInstance.put(`/${id}`, updatedLoan);
      return response.data;
    } catch (error) {
      handleAxiosError(error);
    }
  },

  deleteLoan: async (id: number) => {
    try {
      await LoanInstance.delete(`/${id}`);
    } catch (error) {
      handleAxiosError(error);
    }
  },
};

export default LoanService;
