import useConfirmStore from "@/store/confirmStore";
import React from "react";

const Confirm: React.FC = () => {
  const { message, resolveConfirm } = useConfirmStore();

  if (!resolveConfirm) return null;
  const handleConfirm = () => {
    resolveConfirm(true);
    resetConfirm();
  };

  const handleCancel = () => {
    resolveConfirm(false);
    resetConfirm();
  };

  const resetConfirm = () => {
    useConfirmStore.setState({ resolveConfirm: null, message: "" });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10 z-50">
      <div className="bg-white p-4 rounded shadow-lg">
        <p className="mb-4 font-bold">{message}</p>
        <div className="flex justify-center space-x-2">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-900"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-900"
            onClick={handleConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Confirm;
