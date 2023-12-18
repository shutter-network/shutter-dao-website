import { XMarkIcon } from "@heroicons/react/24/solid";
import React from "react";

interface ModalProps {
  title: string;
  body: React.ReactNode;
  actionButtons: React.ReactNode;
  onClose: () => void;
}
export const Modal: React.FC<ModalProps> = ({
  title,
  body,
  actionButtons,
  onClose,
}) => {
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative my-6 min-w-[250px] max-w-3xl">
          <div className="border-0 rounded-3xl shadow-card-gray-light relative flex flex-col w-full bg-off-white outline-none focus:outline-none">
            <div className="flex-1 flex-cols items-center px-5 min-w-full">
              <div className="py-5">
                <h1 className="text-xl font-semibold">{title}</h1>
              </div>
              <button
                onClick={onClose}
                className="absolute top-5 right-5 text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <div className="px-5">{body}</div>
            <div className="flex justify-center items-center p-5">
              {actionButtons}
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};
