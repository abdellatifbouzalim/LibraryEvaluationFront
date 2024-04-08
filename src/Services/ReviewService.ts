import { ReviewInstance } from './axiosInstance'; // Assuming you have an Axios instance for reviews
import { handleAxiosError } from './ApiError/AxiosErrorHandler';

const ReviewService = {
  getAllReviews: async () => {
    try {
      const response = await ReviewInstance.get("");
      return response.data;
    } catch (error) {
      handleAxiosError(error);
    }
  },

  createReview: async (review: any) => {
    try {
      const response = await ReviewInstance.post("", review);
      return response.data;
    } catch (error) {
      handleAxiosError(error);
    }
  },

  updateReview: async (id: number, updatedReview: any) => {
    try {
      const response = await ReviewInstance.put(`/${id}`, updatedReview);
      return response.data;
    } catch (error) {
      handleAxiosError(error);
    }
  },

  deleteReview: async (id: number) => {
    try {
      await ReviewInstance.delete(`/${id}`);
    } catch (error) {
      handleAxiosError(error);
    }
  },
};

export default ReviewService;
