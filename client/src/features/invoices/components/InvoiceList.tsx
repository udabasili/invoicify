import React, { useEffect } from "react";
import { IoMdAdd } from "react-icons/io";
import { HiOutlineArchive } from "react-icons/hi";
import {
  CustomHeader,
  CustomProps,
} from "@/components/CustomHeader/CustomHeader";
import Loader from "@/components/Elements/Loaders/Loader";
import { InvoiceItem } from "./InvoiceItem";
import { InvoiceListContainer } from "./invoice.styles";
import { useGetInvoices } from "../api/getInvoices";
import { Invoice } from "../type";
import { useAppSelector } from "@/store";
import { toast } from "react-toastify";

export const InvoiceList = ({ setCurrentState }: CustomProps) => {
  const { data, isLoading, isError } = useGetInvoices<Invoice[]>();
  const error = useAppSelector((state) => state.error.error);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  let component: JSX.Element = <></>;
  if (isLoading) {
    return (
      <div className="w-full h-48 flex justify-center items-center">
        <Loader size="lg" />
      </div>
    );
  }

  if (!data || data?.length === 0 || isError) {
    console.log(data?.length);
    component = (
      <div
        role="list"
        aria-label="comments"
        className="bg-white text-gray-500 h-40 flex justify-center items-center flex-col"
      >
        <HiOutlineArchive className="h-10 w-10" />
        <h4>No Invoices Found</h4>
      </div>
    );
  }

  if (data?.length) {
    component = (
      <table className="w-full grid grid-cols-2 lg:bg-white rounded-lg overflow-hidden lg:shadow-lg my-5 lg:table">
        <thead className="col-start-1 col-end-2">
        {data?.map((item) => (
          <tr className="flex flex-col flex-no wrap lg:table-row bg-green-100 dark:bg-green-700 mb-3 ">
            <th
              scope="col"
              className="py-3 px-6 text-xs font-medium tracking-wider text-left text-white uppercase "
            >
              Paid
            </th>
            <th
              scope="col"
              className="py-3 px-6 text-xs font-medium tracking-wider text-left text-white uppercase "
            >
              CustomerName
            </th>
            <th
              scope="col"
              className="py-3 px-6 text-xs font-medium tracking-wider text-left text-white uppercase "
            >
              Payment Due Date
            </th>
            <th
              scope="col"
              className="py-3 px-6 text-xs font-medium tracking-wider text-left text-white uppercase "
            >
              Total
            </th>
            <th
              scope="col"
              className="py-3 px-6 text-xs font-medium tracking-wider text-left text-white uppercase "
            >
              Status
            </th>
            <th
              scope="col"
              className="py-3 px-6 text-xs font-medium tracking-wider text-left text-white uppercase "
            >
              Actions
            </th>
          </tr>
        ))}
        </thead>
        <tbody className="lg:contents col-start-2 col-end-3 flex-col">
          {data?.map((item: Invoice) => (
            <InvoiceItem key={item.invoiceId} {...item} />
          ))}
        </tbody>
      </table>
    );
  }

  return (
    <InvoiceListContainer>
      <CustomHeader
        title="Invoice"
        startIcon={<IoMdAdd />}
        setCurrentState={setCurrentState}
        buttonText="Add Invoice"
        nextType="form"
      />
      {component}
    </InvoiceListContainer>
  );
};
