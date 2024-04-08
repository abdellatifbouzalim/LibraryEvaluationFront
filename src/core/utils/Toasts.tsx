import { toast } from 'react-toastify';



export const showToastSuccess = (message: string) => {
  toast.success(message, {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const showToastError = (message: string) => {
  toast.error(message, {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const showToastInfo = (message: string) => {
  toast.info(message, {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const showToastDeleteConfirmation = (id: number,name: string , onDelete: () => void) => {
  toast.info(
    
    <div className="flex items-center justify-between">
      <span>Are you sure you want to delete this {name}?</span>
      <div className="flex space-x-2">
        <button
          className="bg-red-500 hover:bg-red-700 text-white py-1 px-3 rounded"
          onClick={() => {
            onDelete();
            toast.dismiss(id); 
          }}
        >
          Yes
        </button>
        <button
          className="bg-gray-500 hover:bg-gray-700 text-white py-1 px-3 rounded"
          onClick={() => toast.dismiss(id)}
        >
          No
        </button>
      </div>
    </div>,
    {
      toastId: id,
      autoClose: false,
      closeButton: false,
      position: 'top-center',
      style: {
        fontSize: '16px',
        borderRadius: '8px',
        minWidth: '500px', // Adjust the width as needed
      },
      
      
    }
    
  , );
};


