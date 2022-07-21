import { CustomHeader, CustomProps } from "@/components/CustomHeader/CustomHeader";
import FormComponent from "@/components/Form/Form";
import { InputField } from "@/components/Form/InputField";
import clsx from "clsx";
import React, { ChangeEvent, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { z } from "zod";
import { useAddPrice } from "../api/addPrice";
import { PriceDTO } from "../types/index";
import { PriceListContainer } from "./price.styles";
import { GrAdd } from "react-icons/gr";
import { MdCancel } from "react-icons/md";
import { Form, Formik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { toast } from "react-toastify";
import Button from "@/components/Elements/Button/Button";

const initialValues = {
  title: "",
  price: 0,

};

const schema = z.object({
  title: z.string(),
  price: z.number(),
});

export const PriceForm = ({ setCurrentState }: CustomProps) => {
  const { addPriceFn } = useAddPrice()
  const [features, setFeatures] = useState<Array<string>>([])
  const [feature, setFeature] = useState('')
  const [isLoading, setLoading] = useState(false)

  function handleSetFeature(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value
    setFeature(value)
  }

  function deleteItem(i: number){
    let currentFeatures = [...features]
    currentFeatures = currentFeatures.filter((feature, index) => index !== i )
    setFeatures([...currentFeatures])
  }

  function handleSetFeatures() {
    const currentFeatures = [...features]
    currentFeatures.push(feature)
    console.log(currentFeatures)
    setFeatures([...currentFeatures])
  }

  return (
    <PriceListContainer>
      <CustomHeader
        title="Add Price"
        startIcon={<IoMdArrowRoundBack />}
        setCurrentState={setCurrentState}
        nextType="list"
        buttonText="Go back"
      />
      <Formik

       initialValues={initialValues}
       validationSchema={toFormikValidationSchema(schema)}
       onSubmit={async (values, { setSubmitting }) => {
         if (features.length === 0) {
           toast.error('Add Features for this product')
           return
         }
        setLoading(true)
        const response=  await addPriceFn({
          ...values,
          features: features.join(','),
        })
        if (response === 'success' && setCurrentState) {
          setCurrentState('list')
        }
        setLoading(false)
       }}
     >

       <Form className="flex flex-col ">
        <div className="grid-cols-4 grid  mb-7 gap-3.5">
          <InputField
            label="Product Name"
            name="title"
            type="text"
            required
            containerClassName="col-start-1 col-end-3"
            placeholder="Enter "
          />
          <InputField
            label="Unit Price"
            name="price"
            type="number"
            required
            containerClassName="col-start-1 col-end-3"
            placeholder=""
          />
          <div className=" input-group  mb-4 col-start-3 col-end-5 row-start-1 row-end-2">
            <label
              className={clsx(' text-sm font-medium  rounded-md text-gray-700 grid  grid-cols-[1fr_min-content]')}>
              <span className="col-start-1 col-end-3 mb-1"> Add the features of your product</span>
              <input
                type="text"
                value={feature}
                onChange={handleSetFeature}
                className=" col-start-1 col-end-2 appearance-none block w-full px-3 py-2 border border-gray-300 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
              <button
                onClick={() => handleSetFeatures()}
                className="btn col-start-2 col-end-3 px-3 row-start-2 row-end-3 bg-blue-600 text-white font-medium text-xs leading-tight uppercase shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex items-center" type="button" >
                <GrAdd color="white" size="1.2rem" />
              </button>
            </label>


          </div>
          <ul className="col-start-3 col-end-6">
            {
              features.map((feature, i) => (
                <li key={feature} className=" flex  justify-between items-center px-6 py-2 bg-white border border-gray-200  text-gray-900 w-full rounded-t-lg">
                  <span>{feature}</span>
                  <span onClick={() => deleteItem(i)} className="cursor-pointer"><MdCancel fill="red" size="1.5rem" /></span>
                </li>
              ))
            }
          </ul>

        </div>
        <Button  className="self-center" size="md" variant="primary" type="submit" isLoading={isLoading}>
            Submit
          </Button>
        </Form>
      </Formik>
    </PriceListContainer>
  );
};
