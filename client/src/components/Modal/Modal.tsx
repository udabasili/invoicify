import clsx from "clsx";
import React from "react";
import Button from "../Elements/Button/Button";

const sizes = {
  sm: "w-1/5 h-1/5",
  md: "w-2/5 h-2/5",
  lg: "w-3/5 h-3/5",
  full: "w-full h-full",
};
type ModalProps = {
  closeHandler: () => void;
  children: React.ReactNode;
  saveHandler?: (e: any) => void;
  title: string;
  size?: keyof typeof sizes;
};
const Modal = ({ closeHandler, children, saveHandler, title, size="sm" }: ModalProps) => {
  return (
    <div
      className="modal fade fixed top-0 left-0 flex justify-center items-center bg-black/40 z-50 w-full h-full outline-none overflow-x-hidden overflow-y-auto"
    >
      <div className={clsx("modal-dialog relative pointer-events-none", sizes[size])}>
        <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
          <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
            <h5
              className="text-xl font-medium leading-normal text-gray-800"
              id="exampleModalLabel"
            >
              {title}
            </h5>
            <button
              type="button"
              className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body relative p-4">{children}</div>
          <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
            <Button
              type="button"
              variant="danger"
              size="sm"
              onClick={closeHandler}
              className="ml-1"
            >
              Close
            </Button>
            {saveHandler && (
              <Button
                type="button"
                variant="dark"
                size="sm"
                onClick={saveHandler}
                className="ml-1"
              >
                Confirm
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
