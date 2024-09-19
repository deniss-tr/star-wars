interface ErrorModalProps {
  show: boolean;
  onClose: () => void;
  errorMessage: string;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ show, onClose, errorMessage }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-xl font-semibold text-red-600">Error</h2>
        <p className="mt-4 text-gray-600">{errorMessage}</p>
        <button
          onClick={onClose}
          className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ErrorModal;
