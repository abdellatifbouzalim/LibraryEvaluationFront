import axios, { AxiosError } from "axios";

export const handleAxiosError = (error: AxiosError<ApiError> | Error | unknown) => {
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
  