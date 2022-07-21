import React from "react";
import { PriceListContainer } from "./price.styles";
import { IoMdAdd } from "react-icons/io";
import { CustomHeader, CustomProps } from "@/components/CustomHeader/CustomHeader";
import { useGetPrices } from "../api/getPrices";
import Loader from "@/components/Elements/Loaders/Loader";
import { Price } from "../types/index";
import { PriceItem } from "./PriceItem";
import { GiEmptyMetalBucketHandle } from "react-icons/gi";

export const PricesList = ({ setCurrentState }: CustomProps) => {
  const { data, isLoading, isError } = useGetPrices<Price[]>()

  let component: JSX.Element = <></>;
  if (isLoading) {
    return (
      <div className="w-full h-48 flex justify-center items-center">
        <Loader size="lg" />
      </div>
    );
  }


  if (!data || data?.length === 0 || isError) {
    component = (
      <div
        role="list"
        aria-label="comments"
        className="bg-white text-gray-500 h-40 flex justify-center items-center flex-col my-5"
      >
        <GiEmptyMetalBucketHandle className="h-10 w-10" />
        <h4>No Prices Found</h4>
      </div>
    )
  }


  if (data?.length) {
    component = (
      <div className="min-w-full grid grid-cols-3 gap-4 my-5">
          {
             data?.map((item: Price) => (
              <PriceItem key={item.productId} {...item} />
            ))
          }
      </div>
     
    );
  }


return (
  <PriceListContainer>
    <CustomHeader
      title="Price"
      startIcon={<IoMdAdd />}
      setCurrentState={setCurrentState}
      buttonText="Add Price"
      nextType="form"
    />
    {component}
  </PriceListContainer>
);
};
