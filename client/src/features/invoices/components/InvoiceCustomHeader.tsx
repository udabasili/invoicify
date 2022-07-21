import React, { MutableRefObject } from "react";
import Button from "@/components/Elements/Button/Button";
import ReactToPrint from "react-to-print";
import { useNavigate } from "react-router-dom";


export type CustomProps = {
  setCurrentState: (e: "form" | "list") => void;
};

export type ButtonProps = React.HTMLAttributes<HTMLDivElement> & {
  title: string;
  showSearchBar?: boolean;
  buttonText: string;
  startIcon: React.ReactElement;
};

export const InvoiceCustomHeader = React.forwardRef<
  HTMLDivElement,
  ButtonProps
>(
  (
    {
      title,
      startIcon,
      showSearchBar = false,
      buttonText,
      ...props
    },
    ref
  ) => {

    const navigation = useNavigate()
    return (
      <div className="flex h-20 items-center justify-between col-start-1 ">
        <h3 className="mt-3 text-center text-3xl font-extrabold text-gray-900">
          {title}
        </h3>
        {showSearchBar && (
          <div className="relative">
            {" "}
            <input
              type="text"
              className="h-14 w-96 pr-8 pl-5 rounded z-0 focus:shadow focus:outline-none"
              placeholder="Search anything..."
            />
            <div className="absolute top-4 right-3">
              {" "}
              <i className="fa fa-search text-gray-400 z-20 hover:text-gray-500"></i>{" "}
            </div>
          </div>
        )}
        <div className="flex ">
          <div className="form-check">
            <input
              className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
              type="checkbox"
              value=""
              id="flexCheckDefault"
            />
            <label
              className="form-check-label inline-block text-gray-800"
              htmlFor="flexCheckDefault"
            >
              Default checkbox
            </label>
          </div>
          <ReactToPrint
            trigger={() => (
              <Button type="button" variant="dark" size="sm" className="mr-2">
                Print
              </Button>
            )}
            content={() => (ref as MutableRefObject<HTMLDivElement>).current}
          />
          <Button
            type="button"
            startIcon={startIcon}
            onClick={() => navigation('/invoice')}
            variant="primary"
            size="sm"
          >
            {buttonText}
          </Button>
        </div>
      </div>
    );
  }
);
