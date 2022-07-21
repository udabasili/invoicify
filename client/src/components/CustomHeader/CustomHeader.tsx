import Button from "@/components/Elements/Button/Button";
import React from "react";

type CustomHeaderProps = {
  title: string;
  showSearchBar?: boolean;
  buttonText: string;
  startIcon: React.ReactElement
  nextType: 'form' | 'list'
  handleNavigation?: () => void
};

export type CustomProps = {
    setCurrentState: (e: 'form'|'list' ) => void
}


export const CustomHeader = ({

  title,
  setCurrentState,
  handleNavigation,
  startIcon,
  showSearchBar = false,
  buttonText, 
  nextType
}: CustomHeaderProps & Partial<CustomProps>) => {
  return (
    <div className="flex md:h-20 my-3  justify-between col-start-1 flex-col items-start md:flex-row md:items-center px-0 ">
      <h3 className="mt-3 text-center text-3xl font-extrabold text-gray-900 md:my-0 my-3" >
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
      {
        setCurrentState ?
        <Button
        type="button"
        startIcon={startIcon}
        onClick={() => {
          setCurrentState(nextType);
        }}
        variant="primary"
        size="sm"
      >
       {buttonText}
      </Button> :
      <Button
      type="button"
      startIcon={startIcon}
      onClick={handleNavigation}
      variant="primary"
      size="sm"
    >
     {buttonText}
    </Button> 

      }
      
    </div>
  );
};
