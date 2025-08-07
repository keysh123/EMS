import React from 'react';

const DialogBox = ({  onClose, title, message, children }) => {

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent bg-opacity-50">
      <div className="bg-white w-[90%] sm:w-[400px] rounded-2xl p-6 shadow-lg relative">
        {/* Close Button */}
        <button
          className="absolute top-3 right-4 text-gray-500 hover:text-black text-xl"
          onClick={onClose}
        >
          &times;
        </button>

        {/* Title */}
        {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}

        {/* Message or Custom Content */}
        {message && <p className="text-gray-700">{message}</p>}
        {children && <div className="mt-4">{children}</div>}

    
      </div>
    </div>
  );
};

export default DialogBox;