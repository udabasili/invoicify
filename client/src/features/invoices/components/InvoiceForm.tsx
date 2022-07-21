import {
  CustomHeader,
  CustomProps,
} from "@/components/CustomHeader/CustomHeader";
import Button from "@/components/Elements/Button/Button";
import { useGetClients } from "@/features/clients/api/getClients";
import { Client } from "@/features/clients/types";
import clsx from "clsx";
import { Formik, Form } from "formik";
import { useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { InvoiceItems } from "../type";
import { InvoiceListContainer } from "./invoice.styles";
import InvoiceProductList from "./InvoiceProductList";
import "react-datepicker/dist/react-datepicker.css";
import { useAddInvoice } from "../api/addInvoices";
import { DatePickerField } from "@/components/Form/DatePicker";

const schema = z.object({
  title: z.string(),
  dueDate: z.date(),
  note: z.string(),
  clientId: z.string(),
});

export const InvoiceForm = ({ setCurrentState }: CustomProps) => {
  let clientList: Client[] = [];
  const { data } = useGetClients<Client[]>();
  const [invoiceItems, setInvoiceItems] = useState<InvoiceItems[]>([]);
  const [isLoading, setisLoading] = useState(false);
  const { addInvoiceFn } = useAddInvoice();

  if (data?.length) {
    clientList = data;
  }

  const initialValues = {
    title: "",
    dueDate: "",
    note: "",
    clientId: "",
  };

  const navigate = useNavigate();

  return (
    <InvoiceListContainer>
      <CustomHeader
        title="Add Invoice"
        startIcon={<IoMdArrowRoundBack />}
        setCurrentState={setCurrentState}
        nextType="list"
        buttonText="Go back"
      />
      <InvoiceProductList
        invoiceItems={invoiceItems}
        setInvoiceItems={setInvoiceItems}
      />
      <Formik
        initialValues={{
          ...initialValues,
        }}
        validationSchema={toFormikValidationSchema(schema)}
        onSubmit={async (values, { setSubmitting }) => {
          if (invoiceItems.length === 0) {
            toast.error("You must add at least one invoice item");
            return;
          }
          setisLoading(true)
          setSubmitting(true)
          const data = {
            ...values,
            dueDate: new Date(values.dueDate),
            items: invoiceItems,
          };
          const response = await addInvoiceFn(data);
          if (response === "success" && setCurrentState) {
            setCurrentState("list");
          }
          setisLoading(false)
          setSubmitting(false)

        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <Form>
            <div className="grid grid-cols-2 gap-4 mb-9 md:grid-cols-4">
              <div
                className={clsx(
                  "block text-sm font-medium text-gray-700",
                  "col-start-1 col-end-2"
                )}
              >
                <label
                  className={clsx("block text-sm font-medium text-gray-700")}
                  htmlFor="invoiceTitle"
                >
                  Invoice Title
                  <div className="mt-1">
                    <input
                      type="text"
                      name="title"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.title}
                      className={clsx(
                        "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      )}
                    />
                  </div>
                </label>
                <div className="text-sm color text-red-600"></div>
              </div>
              <div
                className={clsx(
                  "block text-sm font-medium text-gray-700",
                  "col-start-1 col-end-auto md:col-end-3 md:col-start-2"
                )}
              >
                <DatePickerField name="dueDate" label="Payment Due Date" />
                <div className="text-sm color text-red-600" />
              </div>
              <div
                className={clsx(
                  "block text-sm font-medium text-gray-700",
                  "col-span-2 row row-start-2"
                )}
              >
                <label
                  className={clsx("block text-sm font-medium text-gray-700")}
                  htmlFor="invoiceTitle"
                >
                  Note for Client
                  <div className="mt-1">
                    <textarea
                      name="note"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.note}
                      className="
                          form-control
                          block
                          w-full
                          px-3
                          py-1.5
                          text-base
                          font-normal
                          text-gray-700
                          bg-white bg-clip-padding
                          border border-solid border-gray-300
                          rounded
                          transition
                          ease-in-out
                          m-0
                          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                        "
                      id="exampleFormControlTextarea1"
                      rows={3}
                    ></textarea>
                  </div>
                </label>
                <div className="text-sm color text-red-600" />
              </div>
              <h4 className="font-medium leading-tight text-2xl mt-0 mb-2 text-blue-600 col-start-1 col-end-3 md:col-start-3 md:col-end-5">
                Select the Client
              </h4>

              <div className="grid grid-cols-1 col-start-1 col-end-3 md:col-start-3 md:col-end-5">
                <select
                  name="clientId"
                  className="mt-5 h-9 mb-3"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  defaultValue=""
                  value={values.clientId}
                >
                  <option value="" disabled hidden>
                    Choose the Client for this invoice
                  </option>
                  {clientList.map((client) => (
                    <option
                      key={client.userId}
                      value={client.userId}
                      className="p-4"
                    >
                      {client.name}
                    </option>
                  ))}
                </select>
                <Button
                  type="button"
                  variant="primary"
                  size="sm"
                  isLoading={isLoading}
                  onClick={() => {
                      navigate('/client', {
                        state: {
                          type: 'form'
                        }
                      })
                    
                  }}
                  className="justify-self-start"
                >
                  Add Client
                </Button>
              </div>
            </div>
            <Button
              className="self-center"
              size="md"
              variant="primary"
              type="submit"
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </InvoiceListContainer>
  );
};
